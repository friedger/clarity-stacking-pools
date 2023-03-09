import {
  allowContractCaller,
  stackAggregationCommitIndexed,
  stackAggregationIncrease,
} from "./client/pox-2-client.ts";
import {
  delegateStackStx,
  delegateStx,
  getStatusList,
  getStatusListsLastIndex,
  getStatus,
} from "./client/pox-delegation-client.ts";
import { Clarinet, Chain, Account, assertEquals } from "./deps.ts";
import { btcAddrWallet1, btcAddrWallet2, poxAddrPool1 } from "./constants.ts";

Clarinet.test({
  name: "Ensure that users can delegate to two different pools using the same pox btc reward address.",
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
        btcAddrWallet1,
        1,
        wallet_1
      ),

      delegateStx(
        10_000_000_000_000,
        wallet_8.address,
        undefined,
        undefined,
        btcAddrWallet2,
        2,
        wallet_2
      ),

      // lock users with locking period 1
      delegateStackStx(
        [
          {
            user: wallet_1,
            amountUstx: 10_000_000_000_000,
          },
        ],
        poxAddrPool1,
        40,
        1,
        wallet_7
      ),

      // lock users with locking period 2
      delegateStackStx(
        [
          {
            user: wallet_2,
            amountUstx: 10_000_000_000_000,
          },
        ],
        poxAddrPool1,
        40,
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
      stackAggregationCommitIndexed(poxAddrPool1, 1, wallet_7),
      stackAggregationIncrease(poxAddrPool1, 1, 0, wallet_8),
    ]);
    // verify that pox-addr-index = 0
    block.receipts[0].result.expectOk().expectUint(0);
    block.receipts[1].result.expectOk().expectBool(true);

    // verify status for users with locking period 1
    let lockingPeriod = 1;
    let response = getStatusListsLastIndex(
      wallet_7.address,
      1,
      lockingPeriod,
      chain,
      wallet_7
    );
    response.result.expectUint(0);

    response = getStatusList(
      wallet_7.address,
      1,
      lockingPeriod,
      0,
      chain,
      wallet_7
    );
    let statusList = response.result.expectTuple();
    let members = statusList["status-list"].expectSome().expectList();
    members[0].expectTuple().cycle.expectUint(0);

    // verify status for users with locking period 2
    lockingPeriod = 2;
    response = getStatusListsLastIndex(
      wallet_8.address,
      1,
      lockingPeriod,
      chain,
      deployer
    );
    response.result.expectUint(0);

    response = getStatusList(
      wallet_8.address,
      1,
      lockingPeriod,
      0,
      chain,
      deployer
    );
    statusList = response.result.expectTuple();
    members = statusList["status-list"].expectSome().expectList();
    assertEquals(members.length, 1);
    members[0].expectTuple().cycle.expectUint(0);

    // verify that information are based on delegate-stx call only
    // if locking period is more than 1 cycle there is still only one entry
    response = getStatusList(
      wallet_8.address,
      2,
      lockingPeriod,
      0,
      chain,
      deployer
    );
    statusList = response.result.expectTuple();
    members = statusList["status-list"].expectNone();

    // verify user status
    response = getStatus(wallet_7.address, wallet_1.address, chain, deployer);

    let info = response.result.expectOk().expectTuple();
    info["stacker-info"].expectTuple()["first-reward-cycle"].expectUint(1);
    info["user-info"].expectTuple().cycle.expectUint(0);
    info["user-info"].expectTuple()["lock-period"].expectUint(1);
    info["total"].expectUint(10_000_000_000_000);
  },
});
