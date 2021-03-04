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
  faucetCall,
  network,
  handleTransaction,
  ADDR_STACKS_TO_BITCOIN,
  timeout,
} from "../deploy";
import { ADDR1, ADDR2, ADDR3, ADDR4, testnetKeyMap } from "../mocknet";
import BN from "bn.js";
import { StackingClient } from "@stacks/stacking";
import * as c32 from "c32check";

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

const poolAdmin = mocknet
  ? testnetKeyMap[ADDR4]
  : JSON.parse(
      readFileSync(
        mainnet ? "../../mainnet-keys.json" : "../../testnet-keys.json"
      ).toString()
    );

describe("pool flow suite", () => {
  it("fills the accounts", async () => {
    if (mocknet) {
      //await faucetCall(poolAdmin.stacks, 1000000);
      await faucetCall(user.stacks, 20000000000);
    }
  });

  it("deploys", async () => {
    const result = await deployContract(
      xverseContractName,
      `./contracts/${xverseContractName}.clar`,
      (s) => s,
      poolAdmin.private
    );
    expect(result, result).to.be.a("string");
  });

  it("stack-minimum-stx", async () => {
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

  it.only("get-stacker-info", async () => {
    const stackingClient = new StackingClient(delegator.stacks, network);
    const info = await stackingClient.getCoreInfo();
    const poxInfo = await stackingClient.getPoxInfo();
    const userInfo = await stackingClient.getStatus();
    console.log(userInfo);
  });

  it("allow delegator", async () => {
    const tx = await makeContractCall({
      contractAddress: poxContractAddress,
      contractName: "pox",
      functionName: "allow-contract-caller",
      functionArgs: [
        contractPrincipalCV(xverseContractAddress, xverseContractName),
        noneCV(),
      ],
      senderKey: delegator.private,
      network,
    });
    const result = await handleTransaction(tx);
  });

  it("delegate", async () => {
    const [version, hashbytes] = c32.c32addressDecode(delegator.stacks);
    const functionArgs = [
      uintCV(330000000),
      standardPrincipalCV(poolAdmin.stacks),
      noneCV(),
      noneCV(),
      tupleCV({
        hashbytes: bufferCV(Buffer.from(hashbytes, "hex")),
        version: bufferCV(
          Buffer.from(ADDR_STACKS_TO_BITCOIN[version].toString(16), "hex")
        ),
      }),
      uintCV(12),
    ];
    const tx = await makeContractCall({
      contractAddress: xverseContractAddress,
      contractName: xverseContractName,
      functionName: "delegate-stx",
      functionArgs,
      senderKey: delegator.private,
      network,
      postConditionMode: PostConditionMode.Allow,
    });
    await handleTransaction(tx);
  });

  it("delegate-stack-stx", async () => {
    const stackingClient = new StackingClient(poolAdmin.stacks, network);
    const info = await stackingClient.getCoreInfo();
    const amountMicroStx = new BN(330000000);
    const result = await stackingClient.delegateStackStx({
      stacker: delegator.stacks,
      amountMicroStx,
      poxAddress: c32.c32ToB58(poolAdmin.stacks),
      burnBlockHeight: info.burn_block_height,
      cycles: 2,
      privateKey: poolAdmin.private,
    });
  });

  it.only("get-info", async () => {
    const result = await callReadOnlyFunction({
      contractAddress: xverseContractAddress,
      contractName: xverseContractName,
      functionName: "get-user-data",
      functionArgs: [standardPrincipalCV(delegator.stacks)],
      senderAddress: xverseContractAddress,
      network,
    });
    console.log(result);
  });
});
