import {
  allowContractCaller,
  getPartialStackedByCycle,
} from "./client/pox-2-client.ts";
import { delegateStx } from "./client/friedger-pool-delegation-client.ts";
import { Clarinet, Chain, Account } from "./deps.ts";

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

    console.log(block.receipts[1].events,
      getPartialStackedByCycle(
        { version: "0x00", hashbytes: "0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce" },
        1,
        `${deployer.address}.friedger-pool-delegation`,
        chain,
        wallet_1
      )
    );
  },
});
