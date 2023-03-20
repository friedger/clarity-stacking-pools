import {
  AnchorMode,
  bufferCV,
  ClarityValue,
  listCV,
  noneCV,
  PostConditionMode,
  principalCV,
  standardPrincipalCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";
import { StacksNetwork } from "@stacks/network";
import {  Accounts } from "./constants";
import {
  HelperContract,
  poxPoolsSelfServiceContract,
} from "./contracts";
import { decodeBtcAddress } from "@stacks/stacking";
import { toBytes } from "@stacks/common";
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
    contractAddress: poxPoolsSelfServiceContract.address,
    contractName: poxPoolsSelfServiceContract.name,
    functionName: poxPoolsSelfServiceContract.Functions.DelegateStx.name,
    functionArgs: poxPoolsSelfServiceContract.Functions.DelegateStx.args({
      amountUstx: uintCV(amountUstx),
    }),
    nonce,
    network,
    anchorMode: AnchorMode.OnChainOnly,
    postConditionMode: PostConditionMode.Allow,
    senderKey: user.secretKey,
  };
  return handleContractCall({ txOptions, network });
}

export async function broadcastDelegateStackStx({
  stacker,
  amountUstx,
  user,
  nonce,
  network,
}: {
  stacker: {stxAddress:string, secretKey: string};
  amountUstx: number;
  user: {stxAddress:string, secretKey: string};
  nonce: number;
  network: StacksNetwork;
}) {
  let txOptions = {
    contractAddress: poxPoolsSelfServiceContract.address,
    contractName: poxPoolsSelfServiceContract.name,
    functionName: poxPoolsSelfServiceContract.Functions.DelegateStackStx.name,
    functionArgs: poxPoolsSelfServiceContract.Functions.DelegateStackStx.args({
      user: principalCV(stacker.stxAddress),
      amountUstx: uintCV(amountUstx),
    }),
    nonce,
    network,
    anchorMode: AnchorMode.OnChainOnly,
    postConditionMode: PostConditionMode.Allow,
    senderKey: user.secretKey,
  };
  return handleContractCall({ txOptions, network });
}
