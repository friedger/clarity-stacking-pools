import {
  allowContractCaller,
  getPartialStackedByCycle,
} from "./client/pox-2-client.ts";
import {
  delegateStx,
  delegateStackStx,
} from "./client/fp-delegation-client.ts";
import { Clarinet, Chain, Account } from "./deps.ts";
import { expectPartialStackedByCycle } from "./utils.ts";
import { poxAddrFP } from "./constants.ts";

Clarinet.test({
  name: "Ensure that users can delegate",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";

    let block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, wallet_1),
      allowContractCaller(poxDelegationContract, undefined, wallet_2),
      delegateStx(20_000_000_000_000, wallet_1),
      delegateStx(2_000_000, wallet_2),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectUint(20_000_000_000_000);
    block.receipts[3].result.expectOk().expectUint(20_000_002_000_000);

    expectPartialStackedByCycle(poxAddrFP, 1, undefined, chain, deployer);
  },
});

Clarinet.test({
  name: "Ensure that user can increase amount for next cycle",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";

    // current cycle is cycle 0

    // delegate 2 stx for cycle 1
    let block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, wallet_1),
      delegateStx(2_000_000, wallet_1),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectUint(2_000_000);

    expectPartialStackedByCycle(poxAddrFP, 1, 2_000_000, chain, deployer);

    chain.mineEmptyBlock(2100);

    // increase delegation to 3 stx for cycle 2
    block = chain.mineBlock([
      delegateStx(3_000_000, wallet_1),
    ]);

    block.receipts[0].result.expectOk().expectUint(3_000_000);
  },
});

Clarinet.test({
  name: "Ensure that user can extend for next cycle for any user",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";

    let block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, wallet_1),
      delegateStx(2_000_000, wallet_1),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectUint(2_000_000);

    expectPartialStackedByCycle(poxAddrFP, 1, 2_000_000, chain, deployer);
    expectPartialStackedByCycle(poxAddrFP, 2, undefined, chain, deployer);

    chain.mineEmptyBlock(2100);
    // extend to cycle 2
    block = chain.mineBlock([delegateStackStx(2_000_000, wallet_1, wallet_2)]);
    block.receipts[0].result.expectOk().expectUint(2_000_000);
    expectPartialStackedByCycle(poxAddrFP, 2, 2_000_000, chain, deployer);
  },
});
