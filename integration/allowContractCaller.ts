import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  broadcastTransaction,
  contractPrincipalCV,
  makeContractCall,
  noneCV,
  PostConditionMode,
} from "@stacks/transactions";
import { PoxPools1CycleContract, PoxPoolSelfServiceContract } from "./contracts";

export async function broadcastAllowContractCallerContracCallPool1Cycle({
  senderKey,
  network,
  nonce,
}: {
  senderKey: string;
  network: StacksTestnet;
  nonce: number;
}) {
  let txOptions = {
    contractAddress: "ST000000000000000000002AMW42H",
    contractName: "pox-3",
    functionName: "allow-contract-caller",
    functionArgs: [
      contractPrincipalCV(
        PoxPools1CycleContract.address,
        PoxPools1CycleContract.name
      ),
      noneCV(),
    ],
    network,
    nonce,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    senderKey,
  };
  // @ts-ignore
  let tx = await makeContractCall(txOptions);
  // Broadcast transaction to our Devnet stacks node
  return broadcastTransaction(tx, network);
}

export async function broadcastAllowContractCallerContracCallFP({
  senderKey,
  network,
  nonce,
}: {
  senderKey: string;
  network: StacksTestnet;
  nonce: number;
}) {
  let txOptions = {
    contractAddress: "ST000000000000000000002AMW42H",
    contractName: "pox-3",
    functionName: "allow-contract-caller",
    functionArgs: [
      contractPrincipalCV(
        PoxPoolSelfServiceContract.address,
        PoxPoolSelfServiceContract.name
      ),
      noneCV(),
    ],
    network,
    nonce,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    senderKey,
  };
  // @ts-ignore
  let tx = await makeContractCall(txOptions);
  // Broadcast transaction to our Devnet stacks node
  return broadcastTransaction(tx, network);
}
