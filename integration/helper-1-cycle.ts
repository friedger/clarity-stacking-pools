import { Account } from "@hirosystems/stacks-devnet-js";
import { StacksNetwork } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  listCV,
  noneCV,
  principalCV,
  someCV,
  stringAsciiCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";
import { PoxPools1CycleContract } from "./contracts";
import { decodeBtcAddressToCV, handleContractCall } from "./helpers";

export async function broadcastDelegateStx({
  amountUstx,
  delegateTo,
  untilBurnHt,
  poxAddr,
  userPoxAddr,
  nonce,
  network,
  user,
}: {
  amountUstx: number;
  delegateTo: string;
  untilBurnHt?: number;
  poxAddr?: string;
  userPoxAddr: string;
  nonce: number;
  network: StacksNetwork;
  user: { stxAddress: string; secretKey: string };
}) {
  let txOptions = {
    contractAddress: PoxPools1CycleContract.address,
    contractName: PoxPools1CycleContract.name,
    functionName: PoxPools1CycleContract.Functions.DelegateStx.name,
    functionArgs: PoxPools1CycleContract.Functions.DelegateStx.args({
      amountUstx: uintCV(amountUstx),
      delegateTo: principalCV(delegateTo),
      untilBurnHt: untilBurnHt ? someCV(uintCV(untilBurnHt)) : noneCV(),
      poolPoxAddr: noneCV(),
      userPoxAddr: decodeBtcAddressToCV(userPoxAddr),
      userMetadata: someCV(
        tupleCV({
          keys: listCV([stringAsciiCV("payout")]),
          values: listCV([stringAsciiCV("btc")]),
        })
      ),
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
  amountUstx,
  user,
  nonce,
  network,
}: {
  stacker: { stxAddress: string; secretKey: string };
  amountUstx: number;
  user: { stxAddress: string; secretKey: string; btcAddress: string };
  nonce: number;
  network: StacksNetwork;
}) {
  let txOptions = {
    contractAddress: PoxPools1CycleContract.address,
    contractName: PoxPools1CycleContract.name,
    functionName: PoxPools1CycleContract.Functions.DelegateStackStx.name,
    functionArgs: PoxPools1CycleContract.Functions.DelegateStackStx.args({
      users: listCV([principalCV(stacker.stxAddress)]),
      amountUstx: listCV([uintCV(amountUstx)]),
      poxAddress: decodeBtcAddressToCV(user.btcAddress),
    }),
    nonce,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    senderKey: user.secretKey,
  };
  return handleContractCall({ txOptions, network });
}
