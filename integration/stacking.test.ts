import {
  buildDevnetNetworkOrchestrator,
  DEFAULT_EPOCH_TIMELINE,
  getBitcoinBlockHeight,
  getNetworkIdFromEnv,
} from "./helpers";
import {
  broadcastStackSTX,
  waitForNextPreparePhase,
  waitForNextRewardPhase,
  getPoxInfo,
  waitForRewardCycleId,
  initiateStacking,
  createVault,
  getStackerInfo,
  stackIncrease
} from "./helpers";
import { Accounts } from "./constants";
import { StacksTestnet } from "@stacks/network";
import { DevnetNetworkOrchestrator } from "@hirosystems/stacks-devnet-js";
import { HelperContract } from "./contracts";
import { AnchorMode, broadcastTransaction, makeContractCall, PostConditionMode, principalCV } from "@stacks/transactions";

describe("testing stacking under epoch 2.1", () => {
  let orchestrator: DevnetNetworkOrchestrator;
  let timeline = DEFAULT_EPOCH_TIMELINE;

  beforeAll(() => {
    orchestrator = buildDevnetNetworkOrchestrator(getNetworkIdFromEnv());
    orchestrator.start(120000);
  });

  afterAll(() => {
    orchestrator.terminate();
  });

  it("test whole flow with initiate, increase stacking and extend stacking", async () => {
    const network = new StacksTestnet({ url: orchestrator.getStacksNodeUrl() });
    let poxInfo = await getPoxInfo(network);
    const fee = 1000;
    await orchestrator.waitForStacksBlockAnchoredOnBitcoinBlockOfHeight(timeline.pox_2_activation + 1, 5, true);
    poxInfo = await getPoxInfo(network);
    console.log('PoxInfo, Pre conventional stacking:', poxInfo);

    // Let's look at a conventional stack-stx op
    let response = await broadcastStackSTX(
      2,
      network,
      50_000_000_000_000,
      Accounts.WALLET_3,
      poxInfo.current_burnchain_block_height,
      12,
      fee,
      0
    );
    expect(response.error).toBeUndefined();
    await orchestrator.waitForNextStacksBlock();

    poxInfo = await getPoxInfo(network);
    console.log('PoxInfo, Post conventional stacking:', poxInfo);

    await orchestrator.waitForNextStacksBlock();

    // @ts-ignore

    let txOptions = {
      contractAddress: HelperContract.address,
      contractName: HelperContract.name,
      functionName: HelperContract.Functions.GetStxAccount.name,
      functionArgs: [
        principalCV(Accounts.WALLET_3.stxAddress),
      ],
      fee,
      nonce: 1,
      network,
      anchorMode: AnchorMode.OnChainOnly,
      postConditionMode: PostConditionMode.Allow,
      senderKey: Accounts.WALLET_3.secretKey,
    };
    // @ts-ignore
    const tx = await makeContractCall(txOptions);
    // Broadcast transaction to our Devnet stacks node
    const result = await broadcastTransaction(tx, network);
  
    let block = await orchestrator.waitForNextStacksBlock();

    console.log(JSON.stringify(block));

    

  });
});
