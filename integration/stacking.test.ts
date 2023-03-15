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
  stackIncrease,
} from "./helpers";
import { Accounts } from "./constants";
import { StacksTestnet } from "@stacks/network";
import { DevnetNetworkOrchestrator } from "@hirosystems/stacks-devnet-js";
import { decodeBtcAddress } from "@stacks/stacking";
import { toBytes } from "@stacks/common";

import { HelperContract, PoxDelegationContract } from "./contracts";
import {
  AnchorMode,
  broadcastTransaction,
  bufferCV,
  ClarityValue,
  listCV,
  makeContractCall,
  noneCV,
  PostConditionMode,
  principalCV,
  standardPrincipalCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";
import { broadcastAllowContractCallerContracCall } from "./allowContractCaller";

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
    await orchestrator.waitForStacksBlockAnchoredOnBitcoinBlockOfHeight(
      timeline.pox_2_activation + 1,
      5,
      true
    );
    poxInfo = await getPoxInfo(network);
    console.log("PoxInfo, Pre conventional stacking:", poxInfo);

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
    console.log("PoxInfo, Post conventional stacking:", poxInfo);

    await orchestrator.waitForNextStacksBlock();

    // @ts-ignore

    let txOptions = {
      contractAddress: HelperContract.address,
      contractName: HelperContract.name,
      functionName: HelperContract.Functions.GetStxAccount.name,
      functionArgs: [
        principalCV(Accounts.WALLET_3.stxAddress),
      ] as ClarityValue[],
      fee,
      nonce: 1,
      network,
      anchorMode: AnchorMode.OnChainOnly,
      postConditionMode: PostConditionMode.Allow,
      senderKey: Accounts.WALLET_3.secretKey,
    };
    // @ts-ignore
    let tx = await makeContractCall(txOptions);
    // Broadcast transaction to our Devnet stacks node
    let result = await broadcastTransaction(tx, network);

    // allow-contract-caller

    result = await broadcastAllowContractCallerContracCall({
      senderKey: Accounts.DEPLOYER.secretKey,
      network,
      nonce: 3,
    });
    result = await broadcastAllowContractCallerContracCall({
      senderKey: Accounts.WALLET_2.secretKey,
      network,
      nonce: 0,
    });

    //
    // delegate stx
    //

    const { version, data } = decodeBtcAddress(Accounts.WALLET_2.btcAddress);
    // @ts-ignore
    const userAddress = {
      version: bufferCV(toBytes(new Uint8Array([version.valueOf()]))),
      hashbytes: bufferCV(data),
    };

    txOptions = {
      contractAddress: PoxDelegationContract.address,
      contractName: PoxDelegationContract.name,
      functionName: PoxDelegationContract.Functions.DelegateStx.name,
      functionArgs: PoxDelegationContract.Functions.DelegateStx.args({
        amountUstx: uintCV(20_000_000_000),
        delegateTo: standardPrincipalCV(Accounts.DEPLOYER.stxAddress),
        lockPeriod: uintCV(1),
        poolPoxAddr: noneCV(),
        untilBurnHt: noneCV(),
        userPoxAddr: tupleCV(userAddress),
      }),
      fee,
      nonce: 1,
      network,
      anchorMode: AnchorMode.OnChainOnly,
      postConditionMode: PostConditionMode.Allow,
      senderKey: Accounts.WALLET_2.secretKey,
    };
    // @ts-ignore
    tx = await makeContractCall(txOptions);
    // Broadcast transaction to our Devnet stacks node
    result = await broadcastTransaction(tx, network);

    let block = await orchestrator.waitForNextStacksBlock();

    console.log(JSON.stringify(block));

    //
    // delegate-stack-stx
    //

    const { version: version2, data: data2 } = decodeBtcAddress(
      Accounts.DEPLOYER.btcAddress
    );
    // @ts-ignore
    const poxAddrPool = {
      version: bufferCV(toBytes(new Uint8Array([version2.valueOf()]))),
      hashbytes: bufferCV(data2),
    };

    let txOptions2 = {
      contractAddress: PoxDelegationContract.address,
      contractName: PoxDelegationContract.name,
      functionName: PoxDelegationContract.Functions.DelegateStackStx.name,
      functionArgs: PoxDelegationContract.Functions.DelegateStackStx.args({
        poxAddress: tupleCV(poxAddrPool),
        startBurnHt: uintCV(10),
        users: listCV([
          tupleCV({
            user: principalCV(Accounts.WALLET_2.stxAddress),
            "amount-ustx": uintCV(20_000_000_000),
          }),
        ]),
        lockPeriod: uintCV(1),
      }),
      fee,
      nonce: 4,
      network,
      anchorMode: AnchorMode.OnChainOnly,
      postConditionMode: PostConditionMode.Allow,
      senderKey: Accounts.DEPLOYER.secretKey,
    };
    // @ts-ignore
    tx = await makeContractCall(txOptions2);
    // Broadcast transaction to our Devnet stacks node
    result = await broadcastTransaction(tx, network);

    block = await orchestrator.waitForNextStacksBlock();
    console.log(JSON.stringify(block));
  });
});
