import { allowContractCaller } from "./client/pox-2-client.ts";
import { delegateStackStx, delegateStx } from "./client/pox-delegation-client.ts";
import { Clarinet, Tx, Chain, Account, types } from "./deps.ts";

Clarinet.test({
  name: "Ensure that users can delegate",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";

    let block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, wallet_1),
      delegateStx(
        1_000_000,
        deployer.address,
        100,
        undefined,
        { version: "0x01", hashbytes: "0x123456" },
        2,
        wallet_1
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
      delegateStx(
        1000000,
        deployer.address,
        100,
        undefined,
        { version: "0x01", hashbytes: "0x123456" },
        2,
        wallet_1
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(9 * 1000);
  },
});

Clarinet.test({
  name: "Ensure that user can't lock stx",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";

    let block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, wallet_1),

      delegateStx(
        1000,
        deployer.address,
        4000,
        undefined,
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        2,
        wallet_1
      ),

      delegateStackStx(
        [
          {
            user: wallet_1,
            amountUstx: 1000000,
          },
        ],
        {
          version: "0x01",
          hashbytes: "0xb0b75f408a29c271d107e05d614d0ff439813d02",
        },
        2,
        2,
        wallet_2
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    // verify delegate-stack-stx by wallet 2
    let lockingInfoList = block.receipts[2].result.expectOk().expectList();
    lockingInfoList[0].expectErr().expectUint(9 * 1000);
  },
});
