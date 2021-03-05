import {
  bufferCV,
  callReadOnlyFunction,
  contractPrincipalCV,
  getAddressFromPrivateKey,
  listCV,
  makeContractCall,
  makeRandomPrivKey,
  noneCV,
  PostConditionMode,
  StacksPrivateKey,
  standardPrincipalCV,
  TransactionVersion,
  tupleCV,
  TxBroadcastResultOk,
  uintCV,
} from "@stacks/transactions";
import { expect } from "chai";
import { readFileSync } from "fs";
import { describe } from "mocha";
import {
  deployContract,
  user,
  mainnet,
  mocknet,
  network,
  handleTransaction,
  timeout,
  processing,
  faucetCall,
} from "../deploy";
import { ADDR2, ADDR3, ADDR4, testnetKeyMap } from "../mocknet";
import BN from "bn.js";
import { StackingClient } from "@stacks/stacking";
import * as c32 from "c32check";
import { decodeBtcAddress } from "../utils";

const poxContractAddress = mainnet
  ? "SP000000000000000000002Q6VF78"
  : "ST000000000000000000002AMW42H";

const xverseContractAddress = mainnet
  ? "SP000000000000000000002Q6VF78"
  : mocknet
  ? ADDR4
  : "";
const xverseContractName = mainnet ? "xverse" : "xverse";
const delegator = testnetKeyMap[ADDR2];
const delegator2 = testnetKeyMap[ADDR3];
const poolAdmin = mocknet
  ? testnetKeyMap[ADDR4]
  : JSON.parse(
      readFileSync(
        mainnet ? "../../mainnet-keys.json" : "../../testnet-keys.json"
      ).toString()
    );

async function getStatus(user: string) {
  return callReadOnlyFunction({
    contractAddress: xverseContractAddress,
    contractName: xverseContractName,
    functionName: "get-status",
    functionArgs: [standardPrincipalCV(user)],
    senderAddress: user,
    network,
  });
}

async function allowContractCaller(user: {
  stacks: string;
  private: string;
  public: string;
}) {
  const tx = await makeContractCall({
    contractAddress: poxContractAddress,
    contractName: "pox",
    functionName: "allow-contract-caller",
    functionArgs: [
      contractPrincipalCV(xverseContractAddress, xverseContractName),
      noneCV(),
    ],
    senderKey: user.private,
    network,
  });
  return handleTransaction(tx);
}

function poxAddrCV(stxAddress: string) {
  const poxAddress = c32.c32ToB58(stxAddress);
  const { hashMode, data } = decodeBtcAddress(poxAddress);
  const version = bufferCV(new BN(hashMode, 10).toBuffer());
  return tupleCV({
    hashbytes: bufferCV(data),
    version,
  });
}

async function delegateStx(
  stacker: {
    stacks: string;
    private: string;
    public: string;
  },
  amountUStx: number,
  lockingPeriod: number
) {
  const functionArgs = [
    uintCV(amountUStx),
    standardPrincipalCV(poolAdmin.stacks),
    noneCV(),
    noneCV(),
    poxAddrCV(stacker.stacks),
    uintCV(lockingPeriod),
  ];
  const tx = await makeContractCall({
    contractAddress: xverseContractAddress,
    contractName: xverseContractName,
    functionName: "delegate-stx",
    functionArgs,
    senderKey: stacker.private,
    network,
    postConditionMode: PostConditionMode.Allow,
  });
  return await handleTransaction(tx);
}

function generateUsers(count: number) {
  const users: { stacks: string; private: string; public: string }[] = [];
  let privateKey: StacksPrivateKey;
  let address: string;
  for (let index = 0; index < count; index++) {
    privateKey = makeRandomPrivKey();
    address = getAddressFromPrivateKey(
      privateKey.data,
      TransactionVersion.Testnet
    );
    if (index % 100 === 0) {
      console.log(index, address);
    }
    users.push({
      stacks: address,
      private: privateKey.data.toString("hex"),
      public: "",
    });
  }
  return users;
}

async function delegateStackStx(users, amount) {
  const stackingClient = new StackingClient(user.stacks, network);
  const info = await stackingClient.getCoreInfo();
  const functionArgs = [
    listCV(
      users.map((u) =>
        tupleCV({
          user: standardPrincipalCV(u.stacks),
          "amount-ustx": uintCV(amount),
        })
      )
    ),
    poxAddrCV(poolAdmin.stacks),
    uintCV(info.burn_block_height + 1),
    uintCV(2),
  ];
  const tx = await makeContractCall({
    contractAddress: xverseContractAddress,
    contractName: xverseContractName,
    functionName: "delegate-stack-stx",
    functionArgs,
    network,
    senderKey: poolAdmin.private,
  });
  const result = handleTransaction(tx);
  console.log(result);
}
describe("pool flow suite", () => {
  before(() => {
    console.log(network);
  });

  it("fills the accounts", async () => {
    if (mocknet) {
      //await faucetCall(user.stacks, 20000000000);
    }
  });

  it("deploys", async () => {
    const stackingClient = new StackingClient(poolAdmin.stacks, network);
    const poxInfo = await stackingClient.getPoxInfo();
    const rewardCylceLength = poxInfo.reward_cycle_length;
    const firstBurnchainBlockHeight = poxInfo.first_burnchain_block_height;
    const prepareCycleLength = (poxInfo as any).prepare_cycle_length;

    const result = await deployContract(
      xverseContractName,
      `./contracts/${xverseContractName}.clar`,
      (s) =>
        mainnet
          ? s.replace(
              /ST000000000000000000002AMW42H/g,
              "SP000000000000000000002Q6VF78"
            )
          : s,
      poolAdmin.private
    );
    expect(result, result).to.be.a("string");
  });

  it("stack-minimum-stx", async () => {
    console.log("stacking minimum stx");
    const stackingClient = new StackingClient(user.stacks, network);
    const info = await stackingClient.getCoreInfo();
    const poxInfo = await stackingClient.getPoxInfo();
    console.log(await stackingClient.hasMinimumStx());
    console.log(poxInfo, c32.c32ToB58(user.stacks));
    const result = await stackingClient.stack({
      amountMicroStx: new BN(1000000000000),
      privateKey: user.private,
      cycles: 12,
      burnBlockHeight: info.burn_block_height + 1,
      poxAddress: c32.c32ToB58(user.stacks),
    });
    console.log(result);
  });

  it("get-stacker-info", async () => {
    const stackingClient = new StackingClient(user.stacks, network);
    const info = await stackingClient.getCoreInfo();
    const poxInfo = await stackingClient.getPoxInfo();
    const userInfo = await stackingClient.getStatus();
    console.log(userInfo);
  });

  it("flow with 100 users", async () => {
    console.log("allowing contract caller");
    const result1 = await allowContractCaller(poolAdmin);
    const stackingClient = new StackingClient(poolAdmin.stacks, network);

    expect(result1, JSON.stringify(result1)).to.be.a("string");
    const users = generateUsers(100);
    const amount = 110000000000;
    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      console.log(u.stacks);
      await faucetCall(u.stacks, amount);
      await allowContractCaller(u);
      await delegateStx(u, amount, 2);
    }

    // delegate-stack-stx
    await delegateStackStx(users.slice(0, 30), amount);
    await delegateStackStx(users.slice(30, 60), amount);
    await delegateStackStx(users.slice(60), amount);

    const poxInfo = await stackingClient.getPoxInfo();
    const commitTx = await stackingClient.stackAggregationCommit({
      poxAddress: c32.c32ToB58(poolAdmin.stacks),
      rewardCycle: poxInfo.reward_cycle_id + 1,
      privateKey: poolAdmin.private,
    });
    await processing(commitTx as TxBroadcastResultOk);
  });

  it("get payout list", async () => {
    const stackingClient = new StackingClient(poolAdmin.stacks, network);
    const poxInfo = await stackingClient.getPoxInfo();
    console.log(poxInfo.reward_cycle_id);
    const rewardCycle = 1;
    const length = await callReadOnlyFunction({
      contractAddress: xverseContractAddress,
      contractName: xverseContractName,
      functionName: "get-status-list-length",
      functionArgs: [uintCV(rewardCycle)],
      senderAddress: poolAdmin.stacks,
      network,
    });
    console.log({ length });
    const list = await callReadOnlyFunction({
      contractAddress: xverseContractAddress,
      contractName: xverseContractName,
      functionName: "get-status-list",
      functionArgs: [uintCV(rewardCycle), uintCV(0)],
      senderAddress: poolAdmin.stacks,
      network,
    });
    console.log(JSON.stringify(list));
  });
});
