import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
} from "https://deno.land/x/clarinet@v0.6.0/index.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

Clarinet.test({
  name: "Ensure that users can delegate",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "ST000000000000000000002AMW42H.pox",
        "allow-contract-caller",
        [
          types.principal(deployer.address + ".xverse"),
          types.none(),
        ],
        wallet_1.address
      ),

      Tx.contractCall(
        "xverse",
        "delegate-stx",
        [
          types.uint(1000000),
          types.principal(deployer.address),
          types.some(types.uint(100)),
          types.none(),
          types.tuple({version: "0x01", hashbytes: "0x123456"}),
          types.uint(2),
        ],
        wallet_1.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.receipts[0].result, "(err 9)");

    // permission denied
    assertEquals(block.receipts[1].result, "(err u9000)");
    assertEquals(block.height, 2);

  },
});
