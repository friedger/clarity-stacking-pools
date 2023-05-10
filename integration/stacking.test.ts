import {
  DevnetNetworkOrchestrator,
  StacksBlockMetadata,
} from "@hirosystems/stacks-devnet-js";
import { StacksTestnet } from "@stacks/network";
import { Accounts } from "./constants";
import {
  buildDevnetNetworkOrchestrator,
  FAST_FORWARD_TO_EPOCH_2_4,
  getNetworkIdFromEnv,
  getPoxInfo,
  waitForRewardCycleId,
  waitForStacksTransaction,
} from "./helpers";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { broadcastAllowContractCallerContracCall } from "./allowContractCaller";
import { broadcastDelegateStackStx, broadcastDelegateStx } from "./helper-fp";
import { cvToString, responseOkCV, trueCV } from "@stacks/transactions";

describe("testing stacking under epoch 2.4", () => {
  let orchestrator: DevnetNetworkOrchestrator;
  const timeline = FAST_FORWARD_TO_EPOCH_2_4;
  let aliceNonce = 0;
  let bobNonce = 0;

  beforeAll(() => {
    orchestrator = buildDevnetNetworkOrchestrator(getNetworkIdFromEnv());
    orchestrator.start(1000);
  });

  afterAll(() => {
    orchestrator.terminate();
  });

  it("test delegation with fp for three cycles", async () => {
    const network = new StacksTestnet({ url: orchestrator.getStacksNodeUrl() });
    // Wait for 2.4 to go live
    await orchestrator.waitForStacksBlockAnchoredOnBitcoinBlockOfHeight(
      timeline.epoch_2_4
    );
    await orchestrator.waitForNextStacksBlock();

    let poxInfo = await getPoxInfo(network);
    console.log("PoxInfo", poxInfo);

    // allow contract fast pool contract to manage stacking
    let response = await broadcastAllowContractCallerContracCall({
      network,
      nonce: aliceNonce++,
      senderKey: Accounts.WALLET_1.secretKey,
    });
    expect(response.error).toBeUndefined();

    // delegate 10m STX
    response = await broadcastDelegateStx({
      amountUstx: 10_000_000_000,
      user: Accounts.WALLET_1,
      nonce: aliceNonce++,
      network,
    });
    expect(response.error, response.reason).toBeUndefined();

    let [block, tx] = await waitForStacksTransaction(
      orchestrator,
      response.txid
    );
    expect(tx.success).toBeTruthy();

    await waitForRewardCycleId(network, orchestrator, 3);
    let chainUpdate = await orchestrator.waitForNextStacksBlock();
    console.log(
      "** " +
        (chainUpdate.new_blocks[0].block.metadata as StacksBlockMetadata)
          .bitcoin_anchor_block_identifier.index
    );
    console.log(JSON.stringify(chainUpdate));

    // Alice delegates 11m STX
    await broadcastDelegateStx({
      amountUstx: 11_000_000_000,
      user: Accounts.WALLET_1,
      nonce: aliceNonce++,
      network,
    });
    expect(response.error).toBeUndefined();
    [block, tx] = await waitForStacksTransaction(orchestrator, response.txid);
    expect(tx.success).toBeTruthy();
    expect(tx.result).toBe(cvToString(responseOkCV(trueCV())));

    console.log(JSON.stringify(block));

    await waitForRewardCycleId(network, orchestrator, 4);

    chainUpdate = await orchestrator.waitForNextStacksBlock();
    console.log(
      "** " +
        (chainUpdate.new_blocks[0].block.metadata as StacksBlockMetadata)
          .bitcoin_anchor_block_identifier.index
    );
    console.log(JSON.stringify(chainUpdate));

    // Bob extends Alice's locked STX
    response = await broadcastDelegateStackStx({
      amountUstx: 11_000_000_000,
      stacker: Accounts.WALLET_1,
      user: Accounts.WALLET_2,
      nonce: bobNonce++,
      network,
    });
    expect(response.error).toBeUndefined();
    [block, tx] = await waitForStacksTransaction(orchestrator, response.txid);
    expect(tx.success).toBeTruthy();
    expect(tx.result).toBe(cvToString(responseOkCV(trueCV())));
  });
});
