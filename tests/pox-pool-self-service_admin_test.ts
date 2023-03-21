import { allowContractCaller } from "./client/pox-2-client.ts";
import {
  delegateStx,
  delegateStackStx,
  delegateStackStxMany,
  setActive,
  setRewardAdmin,
  setStxBuffer,
  setPoolPoxAddress,
} from "./client/pox-pool-self-service-client.ts";
import { FpErrors } from "./constants.ts";
import { Clarinet, Chain, Account, assertEquals } from "./deps.ts";

Clarinet.test({
  name: "Ensure that admin can deactivate contract",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const poxPoolsSelfServiceContract =
      deployer.address + ".pox-pool-self-service";

    let block = chain.mineBlock([
      setActive(false, deployer),
      allowContractCaller(poxPoolsSelfServiceContract, undefined, wallet_1),
      delegateStx(20_000_000_000_000, wallet_1),
      delegateStackStxMany([wallet_1], deployer),
    ]);

    // check allow contract caller
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result
      .expectErr()
      .expectUint(FpErrors.PoxAddressDeactivated);

    chain.mineEmptyBlock(1050);

    block = chain.mineBlock([delegateStackStxMany([wallet_1], deployer)]);
    block.receipts[0].result
      .expectOk()
      .expectList()[0]
      .expectErr()
      .expectUint(FpErrors.PoxAddressDeactivated);
  },
});

Clarinet.test({
  name: "Ensure that non-admin can use admin functions",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    let block = chain.mineBlock([
      setActive(false, wallet_1),
      setRewardAdmin(wallet_1.address, true, wallet_1),
      setStxBuffer(1_000_000_000_000, wallet_1),
    ]);

    assertEquals(block.receipts.length, 3);
    block.receipts.map((r: any) =>
      r.result.expectErr().expectUint(FpErrors.Unauthorized)
    );
  },
});
