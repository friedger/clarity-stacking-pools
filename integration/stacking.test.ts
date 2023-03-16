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
import {
  DevnetNetworkOrchestrator,
  StacksBlockMetadata,
} from "@hirosystems/stacks-devnet-js";
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
import { afterAll, beforeAll, describe, it } from "vitest";
import { broadcastDelegateStackStx, broadcastDelegateStx } from "./helper-fp";

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

  it("test delegation with fp for three cycles", async () => {
    const network = new StacksTestnet({ url: orchestrator.getStacksNodeUrl() });

    let chainUpdate = await waitForRewardCycleId(network, orchestrator, 2);
    console.log(chainUpdate.new_blocks[0].block.metadata);

    let poxInfo = await getPoxInfo(network);
    console.log("PoxInfo, Pre conventional stacking:", poxInfo);

    await broadcastAllowContractCallerContracCall({
      network,
      nonce: 0,
      senderKey: Accounts.WALLET_4.secretKey,
    });

    await broadcastDelegateStx({
      amountUstx: 10_000_000_000,
      user: Accounts.WALLET_4,
      nonce: 1,
      network,
    });

    chainUpdate = await orchestrator.waitForNextStacksBlock();
    console.log(
      "** " +
        (chainUpdate.new_blocks[0].block.metadata as StacksBlockMetadata)
          .bitcoin_anchor_block_identifier.index
    );
    console.log(JSON.stringify(chainUpdate));

    await waitForRewardCycleId(network, orchestrator, 3);
    chainUpdate = await orchestrator.waitForNextStacksBlock();
    console.log(
      "** " +
        (chainUpdate.new_blocks[0].block.metadata as StacksBlockMetadata)
          .bitcoin_anchor_block_identifier.index
    );
    console.log(JSON.stringify(chainUpdate));

    await broadcastDelegateStx({
      amountUstx: 11_000_000_000,
      user: Accounts.WALLET_4,
      nonce: 2,
      network,
    });
    chainUpdate = await orchestrator.waitForNextStacksBlock();
    console.log(
      "** " +
        (chainUpdate.new_blocks[0].block.metadata as StacksBlockMetadata)
          .bitcoin_anchor_block_identifier.index
    );
    console.log(JSON.stringify(chainUpdate));

    await waitForRewardCycleId(network, orchestrator, 4);

    chainUpdate = await orchestrator.waitForNextStacksBlock();
    console.log(
      "** " +
        (chainUpdate.new_blocks[0].block.metadata as StacksBlockMetadata)
          .bitcoin_anchor_block_identifier.index
    );
    console.log(JSON.stringify(chainUpdate));

    await broadcastDelegateStackStx({
      amountUstx: 11_000_000_000,
      stacker: Accounts.WALLET_4,
      user: Accounts.DEPLOYER,
      nonce: 3,
      network,
    });
    chainUpdate = await orchestrator.waitForNextStacksBlock();
    console.log(
      "** " +
        (chainUpdate.new_blocks[0].block.metadata as StacksBlockMetadata)
          .bitcoin_anchor_block_identifier.index
    );
    console.log(JSON.stringify(chainUpdate));
  });
});
