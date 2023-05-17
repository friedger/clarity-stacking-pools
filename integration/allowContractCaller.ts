import {
  AnchorMode,
  broadcastTransaction,
  contractPrincipalCV,
  makeContractCall,
  noneCV,
  PostConditionMode,
} from "@stacks/transactions";
import { poxPools1CycleContract } from "./contracts";
import { StacksTestnet } from "@stacks/network";

export async function broadcastAllowContractCallerContracCall({
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
        poxPools1CycleContract.address,
        poxPools1CycleContract.name
      ),
      noneCV(),
    ],
    network,
    nonce,
    anchorMode: AnchorMode.OnChainOnly,
    postConditionMode: PostConditionMode.Allow,
    senderKey,
  };
  // @ts-ignore
  let tx = await makeContractCall(txOptions);
  // Broadcast transaction to our Devnet stacks node
  return broadcastTransaction(tx, network);
}
