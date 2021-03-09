import {
  bufferCV,
  callReadOnlyFunction,
  contractPrincipalCV,
  listCV,
  makeContractCall,
  noneCV,
  PostConditionMode,
  standardPrincipalCV,
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
    contractPrincipalCV(xverseContractAddress, xverseContractName),
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
    console.log(info, poxInfo, userInfo);
  });

  it("allow contract caller", async () => {
    console.log("allowing contract caller");
    const result1 = await allowContractCaller(delegator);
    expect(result1, JSON.stringify(result1)).to.be.a("string");
    const result2 = await allowContractCaller(delegator2);
    expect(result2, JSON.stringify(result1)).to.be.a("string");
    const result3 = await allowContractCaller(poolAdmin);
    expect(result3, JSON.stringify(result2)).to.be.a("string");
  });

  it("delegate-stx", async () => {
    console.log("delegating stx");
    const result1 = await delegateStx(delegator, 1100000000000, 2);
    console.log(result1);
    const result2 = await delegateStx(delegator2, 2200000000000, 2);
    console.log(result2);
  });

  it("delegate-stack-stx via genesis pox", async () => {
    console.log("stacking delegated stx via genesis pox");
    const stackingClient = new StackingClient(poolAdmin.stacks, network);
    const info = await stackingClient.getCoreInfo();
    const amountMicroStx = new BN(1100000000000);
    const result = await stackingClient.delegateStackStx({
      stacker: delegator.stacks,
      amountMicroStx,
      poxAddress: c32.c32ToB58(poolAdmin.stacks),
      burnBlockHeight: info.burn_block_height + 1,
      cycles: 2,
      privateKey: poolAdmin.private,
    });
    console.log(result);
    await processing(result as TxBroadcastResultOk);
    await timeout(10000); // wait until processed otherwise the next tx overwrite this with the same nonce
  });

  it.only("delegate-stack-stx via xverse", async () => {
    console.log("stacking delegated stx via xverse");
    const stackingClient = new StackingClient(poolAdmin.stacks, network);
    const info = await stackingClient.getCoreInfo();
    const functionArgs = [
      standardPrincipalCV(delegator2.stacks),
      uintCV(2200000000000),
      poxAddrCV(poolAdmin.stacks),
      uintCV(info.burn_block_height + 1),
      uintCV(2),
    ];
    const tx = await makeContractCall({
      contractAddress: xverseContractAddress,
      contractName: xverseContractName,
      functionName: "contract-delegate-stack-stx",
      functionArgs,
      network,
      senderKey: poolAdmin.private,
    });
    const result = await handleTransaction(tx);
    return result;
  });

  it.only("aggregate", async () => {
    const status1 = await getStatus(delegator.stacks);
    const status2 = await getStatus(delegator2.stacks);
    console.log(JSON.stringify(status1));
    console.log(JSON.stringify(status2));

    console.log("aggregating commits");
    const stackingClient = new StackingClient(poolAdmin.stacks, network);
    const poxInfo = await stackingClient.getPoxInfo();
    const functionArgs = [
      tupleCV({
        "pox-address": poxAddrCV(poolAdmin.stacks),
        "reward-cylce": uintCV(poxInfo.reward_cycle_id + 1),
      }),
    ];
    const tx = await makeContractCall({
      contractAddress: xverseContractAddress,
      contractName: xverseContractName,
      functionName: "contract-stack-aggregate-commit",
      functionArgs,
      network,
      senderKey: poolAdmin.private,
    });
    const result = await handleTransaction(tx);
    return result;
  });

  it("get-status", async () => {
    const status1 = await getStatus(delegator.stacks);
    const status2 = await getStatus(delegator2.stacks);
    console.log(JSON.stringify(status1));
    console.log(JSON.stringify(status2));
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

  it("verify pox-addresses", async () => {
    const stackingClient = new StackingClient(poolAdmin.stacks, network);
    console.log(
      JSON.stringify(
        stackingClient.getDelegateStackOptions({
          contract: `${poxContractAddress}.pox`,
          stacker: delegator.stacks,
          amountMicroStx: new BN(1000),
          cycles: 1,
          burnBlockHeight: 100,
          poxAddress: c32.c32ToB58(poolAdmin.stacks),
        }).functionArgs
      )
    );
    console.log(c32.c32ToB58(poolAdmin.stacks));
    console.log(JSON.stringify(poxAddrCV(poolAdmin.stacks)));
  });
});
