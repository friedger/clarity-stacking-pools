import { allowContractCaller } from "./client/pox-2-client.ts";
import {
  delegateStx,
  delegateStackStx,
  delegateStackStxMany,
} from "./client/fp-delegation-client.ts";
import { Clarinet, Chain, Account, assertEquals } from "./deps.ts";
import { expectPartialStackedByCycle } from "./utils.ts";
import { FpErrors, PoxErrors, poxAddrFP } from "./constants.ts";
import { poxDelegationAllowContractCaller } from "./client/pox-delegation-client.ts";
import { expectTotalStackedByCycle } from "./utils.ts";

Clarinet.test({
  name: "Ensure that user can lock for others",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const fpDelegationContract = deployer.address + ".fp-delegation";

    let block = chain.mineBlock([
      allowContractCaller(fpDelegationContract, undefined, wallet_1),
      allowContractCaller(fpDelegationContract, undefined, wallet_2),

      delegateStx(20_000_000_000_000, wallet_1),
      delegateStx(2_000_000, wallet_2),
    ]);

    // check allow contract caller
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    // check delegation calls
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectOk().expectBool(true);

    delegateStackStxMany([wallet_1, wallet_2], deployer);
  },
});

Clarinet.test({
  name: "See that in simnet user can't increase amount for next cycle",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;

    const fpDelegationContract = deployer.address + ".fp-delegation";
    // current cycle is cycle 0

    // delegate 2 stx for cycle 1
    let block = chain.mineBlock([
      allowContractCaller(fpDelegationContract, undefined, wallet_1),
      allowContractCaller(fpDelegationContract, undefined, wallet_2),
      delegateStx(2_000_000, wallet_1),
      delegateStx(2_000_000, wallet_2),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectOk().expectBool(true);

    expectPartialStackedByCycle(poxAddrFP, 1, 4_000_000, chain, deployer);
    expectTotalStackedByCycle(1, 0, undefined, chain, deployer);

    chain.mineEmptyBlock(3200);

    // increase delegation to 3 stx for cycle 2
    block = chain.mineBlock([
      delegateStackStxMany([wallet_1, wallet_2], deployer),
    ]);

    // support for simnet is limited, in particular stx-account returns other values
    // therefore, delegate-stack-stx fails as stx-account locked amount returns 0.
    // block.receipts[0].result.expectOk().expectList()[0].expectOk().expectTuple();
    // block.receipts[1].result.expectOk().expectList()[0].expectOk().expectTuple();
    block.receipts[0].result
      .expectOk()
      .expectList()[0]
      .expectErr()
      .expectUint(PoxErrors.StackExtendNotLocked * 1_000_000);
      block.receipts[0].result
      .expectOk()
      .expectList()[1]
      .expectErr()
      .expectUint(PoxErrors.StackExtendNotLocked * 1_000_000);
  },
});

Clarinet.test({
  name: "See that in simnet user can extend for next cycle for any user",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const fpDelegationContract = deployer.address + ".fp-delegation";

    let block = chain.mineBlock([
      allowContractCaller(fpDelegationContract, undefined, wallet_1),
      delegateStx(2_000_000, wallet_1),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    expectPartialStackedByCycle(poxAddrFP, 1, 2_000_000, chain, deployer);
    expectPartialStackedByCycle(poxAddrFP, 2, undefined, chain, deployer);

    // advance to middle of next cycle
    block = chain.mineEmptyBlock(3149);
    // try to extend to cycle 2 early
    block = chain.mineBlock([delegateStackStx(wallet_1, wallet_2)]);
    assertEquals(block.height, 3152);
    block.receipts[0].result.expectErr().expectUint(FpErrors.TooEarly);

    // extend to cycle 2
    block = chain.mineBlock([delegateStackStx(wallet_1, wallet_2)]);
    expectPartialStackedByCycle(poxAddrFP, 2, undefined, chain, deployer);

    // support for simnet is limited, in particular stx-account returns other values
    // .. therefore, delegate-stack-stx fails as stx-account locked amount returns 0.
    // block.receipts[0].result.expectOk().expectUint(2_000_000);
    block.receipts[0].result
      .expectErr()
      .expectUint(PoxErrors.StackExtendNotLocked * 1_000_000);

    // .. therefore, partial stacked amount for cycle 2 is none.
    // expectPartialStackedByCycle(poxAddrFP, 2, 2_000_000, chain, deployer);
    expectPartialStackedByCycle(poxAddrFP, 2, undefined, chain, deployer);
  },
});
