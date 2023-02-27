import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
} from "https://deno.land/x/clarinet@v1.4.1/index.ts";

Clarinet.test({
  name: "Ensure that users can delegate",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "ST000000000000000000002AMW42H.pox-2",
        "allow-contract-caller",
        [types.principal(deployer.address + ".pox-delegation"), types.none()],
        wallet_1.address
      ),

      Tx.contractCall(
        "pox-delegation",
        "delegate-stx",
        [
          types.uint(1000000),
          types.principal(deployer.address),
          types.some(types.uint(100)),
          types.none(),
          types.tuple({ version: "0x01", hashbytes: "0x123456" }),
          types.uint(2),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Ensure that users can't delegate without allowing contract",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "pox-delegation",
        "delegate-stx",
        [
          types.uint(1000000),
          types.principal(deployer.address),
          types.some(types.uint(100)),
          types.none(),
          types.tuple({ version: "0x01", hashbytes: "0x123456" }),
          types.uint(2),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(9 * 1000);
  },
});

Clarinet.test({
  name: "Ensure that only admin can lock stx",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "ST000000000000000000002AMW42H.pox-2",
        "allow-contract-caller",
        [types.principal(deployer.address + ".pox-delegation"), types.none()],
        wallet_1.address
      ),

      Tx.contractCall(
        "ST000000000000000000002AMW42H.pox-2",
        "allow-contract-caller",
        [types.principal(deployer.address + ".pox-delegation"), types.none()],
        deployer.address
      ),

      Tx.contractCall(
        "pox-delegation",
        "delegate-stx",
        [
          types.uint(1000000),
          types.principal(deployer.address),
          types.some(types.uint(4000)),
          types.none(),
          types.tuple({
            version: "0x01",
            hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
          }),
          types.uint(2),
        ],
        wallet_1.address
      ),
      Tx.contractCall(
        "pox-delegation",
        "delegate-stack-stx",
        [
          types.list([
            types.tuple({
              user: types.principal(wallet_1.address),
              "amount-ustx": types.uint(1000000),
            }),
          ]),
          types.tuple({
            version: "0x01",
            hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
          }),
          types.uint(2),
          types.uint(2),
        ],
        wallet_2.address
      ),
      Tx.contractCall(
        "pox-delegation",
        "delegate-stack-stx",
        [
          types.list([
            types.tuple({
              user: types.principal(wallet_1.address),
              "amount-ustx": types.uint(1000000),
            }),
          ]),
          types.tuple({
            version: "0x01",
            hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
          }),
          types.uint(2),
          types.uint(2),
        ],
        deployer.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    // verify delegate-stack-stx by wallet 2
    let lockingInfoList = block.receipts[3].result.expectOk().expectList();
    lockingInfoList[0].expectErr().expectUint(9 * 1000);

    // verify delegate-stack-stx by pool operator
    lockingInfoList = block.receipts[4].result.expectOk().expectList();
    lockingInfoList[0]
      .expectOk()
      .expectTuple()
      ["unlock-burn-height"].expectUint(3150);
  },
});
