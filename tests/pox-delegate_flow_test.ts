import {
  allowContractCaller,
  stackAggregationCommitIndexed,
} from "./client/pox-2-client.ts";
import {
  delegateStackStx,
  delegateStx,
} from "./client/pox-delegation-client.ts";
import { Clarinet, Tx, Chain, Account, types } from "./deps.ts";

Clarinet.test({
  name: "Ensure that user can delegate and pool operator can lock stx and aggregate commit",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";

    let block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, deployer),
      allowContractCaller(poxDelegationContract, undefined, wallet_1),
      allowContractCaller(poxDelegationContract, undefined, wallet_2),

      delegateStx(
        1_000_000,
        deployer.address,
        6300,
        undefined,
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        2,
        wallet_1
      ),

      delegateStx(
        10_000_000_000_000,
        deployer.address,
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
            amountUstx: 1_000_000,
          },
          {
            user: wallet_2,
            amountUstx: 10_000_000_000_000,
          },
        ],
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        40,
        2,
        deployer
      ),
    ]);

    // verify results for allow contract caller
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    // verify results for delegat-stx calls
    block.receipts[3].result.expectOk().expectBool(true);
    block.receipts[4].result.expectOk().expectBool(true);

    // verify delegate-stack-stx call by pool operator
    let lockingInfoList = block.receipts[5].result.expectOk().expectList();
    lockingInfoList[0]
      .expectOk()
      .expectTuple()
      ["unlock-burn-height"].expectUint(6300);

    lockingInfoList[1]
      .expectOk()
      .expectTuple()
      ["unlock-burn-height"].expectUint(6300);

    // commit for cycle 1
    block = chain.mineBlock([
      stackAggregationCommitIndexed(
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        1,
        deployer
      ),
    ]);
    // verify that pox-addr-index = 0
    block.receipts[0].result.expectOk().expectUint(0);
  },
});
