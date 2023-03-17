import { allowContractCaller } from "./client/pox-2-client.ts";
import {
  delegateStx,
  fpDelegationAllowContractCaller,
} from "./client/fp-delegation-client.ts";
import { Clarinet, Chain, Account, Tx, types } from "./deps.ts";
import { Errors, PoxErrors } from "./constants.ts";
import { poxDelegationAllowContractCaller } from "./client/pox-delegation-client.ts";

Clarinet.test({
  name: "Ensure that user can't delegate without allowance",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";
    const fpDelegationContract = deployer.address + ".fp-delegation";

    // try without any allowance
    let block = chain.mineBlock([delegateStx(20_000_000_000_000, wallet_1)]);

    // check delegation calls
    block.receipts[0].result
      .expectErr()
      .expectUint(Errors.StackingPermissionDenied);

    // try with pox delegation allowance only
    block = chain.mineBlock([
      poxDelegationAllowContractCaller(
        fpDelegationContract,
        undefined,
        wallet_1
      ),
      delegateStx(20_000_000_000_000, wallet_1),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result
      .expectErr()
      .expectUint(PoxErrors.StackingPermissionDenied * 1000);

    // try with pox allowance only
    block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, wallet_2),
      delegateStx(20_000_000_000_000, wallet_2),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result
      .expectErr()
      .expectUint(Errors.StackingPermissionDenied);
  },
});

Clarinet.test({
  name: "Ensure that user can only delegate from a contract with three allowances",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const helperDelegateStx = (amountUstx: number, user: Account) => {
      return Tx.contractCall(
        "helper",
        "delegate-stx",
        [types.uint(amountUstx)],
        user.address
      );
    };
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";
    const fpDelegationContract = deployer.address + ".fp-delegation";
    const helperContract = deployer.address + ".helper";

    // try without any allowance
    let block = chain.mineBlock([helperDelegateStx(20_000_000_000, wallet_1)]);
    block.receipts[0].result.expectErr().expectUint(709);

    // try with additional pox allowance
    block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, wallet_1),
      helperDelegateStx(20_000_000_000_000, wallet_1),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectErr().expectUint(709);

    // try with pox delegation allowance only
    block = chain.mineBlock([
      poxDelegationAllowContractCaller(
        fpDelegationContract,
        undefined,
        wallet_1
      ),
      helperDelegateStx(20_000_000_000_000, wallet_1),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectErr().expectUint(709);

    // delegate-stx with all allowances
    block = chain.mineBlock([
      fpDelegationAllowContractCaller(helperContract, undefined, wallet_1),
      helperDelegateStx(20_000_000_000_000, wallet_1),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectUint(20_000_000_000_000);
  },
});
