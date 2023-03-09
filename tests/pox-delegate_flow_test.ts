import {
  allowContractCaller,
  stackAggregationCommitIndexed,
} from "./client/pox-2-client.ts";
import {
  delegateStackStx,
  delegateStx,
} from "./client/pox-delegation-client.ts";
import { Clarinet, Tx, Chain, Account } from "./deps.ts";
import {
  btcAddrWallet1,
  btcAddrWallet2,
  poxAddrPool1,
  Errors,
} from "./constants.ts";

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
        btcAddrWallet1,
        2,
        wallet_1
      ),

      delegateStx(
        10_000_000_000_000,
        deployer.address,
        undefined,
        undefined,
        btcAddrWallet2,
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
        poxAddrPool1,
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
      stackAggregationCommitIndexed(poxAddrPool1, 1, deployer),
    ]);
    // verify that pox-addr-index = 0
    block.receipts[0].result.expectOk().expectUint(0);
  },
});

Clarinet.test({
  name: "Ensure that pool operator can't stack more than user balance",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    let faucet = accounts.get("faucet")!;
    const poxDelegationContract = deployer.address + ".pox-delegation";

    let block = chain.mineBlock([
      allowContractCaller(poxDelegationContract, undefined, deployer),
      allowContractCaller(poxDelegationContract, undefined, wallet_1),
      allowContractCaller(poxDelegationContract, undefined, wallet_2),

      delegateStx(
        1_000_000,
        deployer.address,
        4200,
        undefined,
        btcAddrWallet1,
        1,
        wallet_1
      ),

      delegateStx(
        10_000_000_000_000,
        deployer.address,
        undefined,
        undefined,
        btcAddrWallet2,
        2,
        wallet_2
      ),
    ]);

    // verify results for allow contract caller
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    // verify results for delegat-stx calls
    block.receipts[3].result.expectOk().expectBool(true);
    block.receipts[4].result.expectOk().expectBool(true);

    // return tokens to faucet
    // wallet_1 balance = 0
    block = chain.mineBlock([
      Tx.transferSTX(100_000_000_000_000, faucet.address, wallet_1.address),
    ]);

    block = chain.mineBlock([
      // delegate stack stx
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
        poxAddrPool1,
        40,
        1,
        deployer
      ),
    ]);

    // verify delegate-stack-stx call by pool operator
    let lockingInfoList = block.receipts[0].result.expectOk().expectList();
    lockingInfoList[0].expectErr().expectUint(Errors.NonPositiveAmount);

    let info = lockingInfoList[1].expectOk().expectTuple();
    info["unlock-burn-height"].expectUint(4200);

    // try again after loading wallet_1 with STX
    block = chain.mineBlock([
      // transfer STX tokens to wallet_1
      Tx.transferSTX(500_000, wallet_1.address, faucet.address),
      // delegate stack stx
      delegateStackStx(
        [
          {
            user: wallet_1,
            amountUstx: 1_000_000,
          },
        ],
        poxAddrPool1,
        40,
        1,
        deployer
      ),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    // verify info of wallet_1
    lockingInfoList = block.receipts[1].result.expectOk().expectList();
    info = lockingInfoList[0].expectOk().expectTuple();
    info["lock-amount"].expectUint(500_000);
  },
});
