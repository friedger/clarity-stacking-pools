import { StacksNetwork } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  principalCV,
  uintCV
} from "@stacks/transactions";
import {
  PoxPoolSelfServiceContract
} from "./contracts";
import { handleContractCall } from "./helpers";

export async function broadcastDelegateStx({
  amountUstx,
  nonce,
  network,
  user,
}: {
  amountUstx: number;
  nonce: number;
  network: StacksNetwork;
  user: {stxAddress:string, secretKey: string};
}) {
  let txOptions = {
    contractAddress: PoxPoolSelfServiceContract.address,
    contractName: PoxPoolSelfServiceContract.name,
    functionName: PoxPoolSelfServiceContract.Functions.DelegateStx.name,
    functionArgs: PoxPoolSelfServiceContract.Functions.DelegateStx.args({
      amountUstx: uintCV(amountUstx),
    }),
    nonce,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    senderKey: user.secretKey,
  };
  return handleContractCall({ txOptions, network });
}

export async function broadcastDelegateStackStx({
  stacker,
  user,
  nonce,
  network,
}: {
  stacker: {stxAddress:string, secretKey: string};
  user: {stxAddress:string, secretKey: string};
  nonce: number;
  network: StacksNetwork;
}) {
  let txOptions = {
    contractAddress: PoxPoolSelfServiceContract.address,
    contractName: PoxPoolSelfServiceContract.name,
    functionName: PoxPoolSelfServiceContract.Functions.DelegateStackStx.name,
    functionArgs: PoxPoolSelfServiceContract.Functions.DelegateStackStx.args({
      user: principalCV(stacker.stxAddress),
    }),
    nonce,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    senderKey: user.secretKey,
  };
  return handleContractCall({ txOptions, network });
}
