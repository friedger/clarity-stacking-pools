import {
  allowContractCaller,
  stackAggregationCommitIndexed,
  stackAggregationIncrease,
} from "./client/pox-2-client.ts";
import {
  delegateStackStx,
  delegateStx,
} from "./client/pox-delegation-client.ts";
import { Clarinet, Tx, Chain, Account, types } from "./deps.ts";

Clarinet.test({
  name: "Ensure that users can delegate to two different pools",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    let wallet_7 = accounts.get("wallet_7")!;
    let wallet_8 = accounts.get("wallet_8")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";

    let block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, wallet_1),
      allowContractCaller(poxDelegationContract, undefined, wallet_2),
      allowContractCaller(poxDelegationContract, undefined, wallet_7),
      allowContractCaller(poxDelegationContract, undefined, wallet_8),

      delegateStx(
        10_000_000_000_000,
        wallet_7.address,
        4000,
        undefined,
        {
          version: "0x01",
          hashbytes: "0x000102030405060708090a0b0c0d0e0f00010203",
        },
        1,
        wallet_1
      ),

      delegateStx(
        10_000_000_000_000,
        wallet_8.address,
        undefined,
        undefined,
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        2,
        wallet_2
      ),

      delegateStackStx(
        [
          {
            user: wallet_1,
            amountUstx: 10_000_000_000_000,
          },
        ],
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        2,
        1,
        wallet_7
      ),

      delegateStackStx(
        [
          {
            user: wallet_2,
            amountUstx: 10_000_000_000_000,
          },
        ],
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        2,
        2,
        wallet_8
      ),
    ]);

    // verify results for allow contract caller
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectOk().expectBool(true);
    // verify results for delegat-stx calls
    block.receipts[4].result.expectOk().expectBool(true);
    block.receipts[5].result.expectOk().expectBool(true);

    // verify delegate-stack-stx call by pool operator
    let lockingInfoList = block.receipts[6].result.expectOk().expectList();
    lockingInfoList[0]
      .expectOk()
      .expectTuple()
      ["unlock-burn-height"].expectUint(2100);

    lockingInfoList = block.receipts[7].result.expectOk().expectList();
    lockingInfoList[0]
      .expectOk()
      .expectTuple()
      ["unlock-burn-height"].expectUint(3150);

    // commit for cycle 1
    block = chain.mineBlock([
      stackAggregationCommitIndexed(
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        1,
        wallet_7
      ),
      stackAggregationIncrease(
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        1,
        0,
        wallet_8
      ),
    ]);
    // verify that pox-addr-index = 0 and 1
    block.receipts[0].result.expectOk().expectUint(0);
    block.receipts[1].result.expectOk().expectBool(true);
  },
});
