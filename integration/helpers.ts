import { Accounts, Contracts, DEFAULT_FEE } from "./constants";
import {
  StacksBlockMetadata,
  StacksChainUpdate,
  DevnetNetworkOrchestrator,
  StacksTransactionMetadata,
  getIsolatedNetworkConfigUsingNetworkId,
} from "@hirosystems/stacks-devnet-js";
import { StacksNetwork, StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  broadcastTransaction,
  bufferCV,
  contractPrincipalCV,
  falseCV,
  getNonce,
  makeContractCall,
  PostConditionMode,
  stringAsciiCV,
  trueCV,
  tupleCV,
  TxBroadcastResult,
  uintCV,
  callReadOnlyFunction,
  cvToJSON,
  makeContractDeploy,
} from "@stacks/transactions";
import { Constants } from "./constants";

import { decodeBtcAddress } from "@stacks/stacking";
import { toBytes } from "@stacks/common";
import { expect } from "vitest";
const fetch = require("node-fetch");

interface Account {
  stxAddress: string;
  btcAddress: string;
  secretKey: string;
}

export interface EpochTimeline {
  epoch_2_0?: number;
  epoch_2_05?: number;
  epoch_2_1?: number;
  pox_2_activation?: number;
  epoch_2_2?: number;
  epoch_2_3?: number;
  epoch_2_4?: number;
}

export interface Epoch24Timeline extends EpochTimeline {
  epoch_2_4: number;
}

export const DEFAULT_EPOCH_TIMELINE = {
  epoch_2_0: Constants.DEVNET_DEFAULT_EPOCH_2_0,
  epoch_2_05: Constants.DEVNET_DEFAULT_EPOCH_2_05,
  epoch_2_1: Constants.DEVNET_DEFAULT_EPOCH_2_1,
  pox_2_activation: Constants.DEVNET_DEFAULT_POX_2_ACTIVATION,
  epoch_2_2: Constants.DEVNET_DEFAULT_EPOCH_2_2,
  epoch_2_3: Constants.DEVNET_DEFAULT_EPOCH_2_3,
  epoch_2_4: Constants.DEVNET_DEFAULT_EPOCH_2_4,
};

export const FAST_FORWARD_TO_EPOCH_2_4 = {
  epoch_2_0: 100,
  epoch_2_05: 102,
  epoch_2_1: 104,
  pox_2_activation: 105,
  epoch_2_2: 106,
  epoch_2_3: 108,
  epoch_2_4: 112,
};

export const POX_CYCLE_LENGTH = 10;

const delay = () => new Promise((resolve) => setTimeout(resolve, 3000));

/// This function will fill in any missing epoch values in the timeline
/// with reasonable block heights.
function fillTimeline(timeline: EpochTimeline) {
  if (timeline.epoch_2_0 === undefined) {
    timeline.epoch_2_0 = DEFAULT_EPOCH_TIMELINE.epoch_2_0;
  }
  if (timeline.epoch_2_05 === undefined) {
    timeline.epoch_2_05 = DEFAULT_EPOCH_TIMELINE.epoch_2_05;
    while (timeline.epoch_2_05 <= timeline.epoch_2_0) {
      timeline.epoch_2_05 += POX_CYCLE_LENGTH;
    }
  }
  if (timeline.epoch_2_1 === undefined) {
    timeline.epoch_2_1 = DEFAULT_EPOCH_TIMELINE.epoch_2_1;
    while (timeline.epoch_2_1 <= timeline.epoch_2_05) {
      timeline.epoch_2_1 += POX_CYCLE_LENGTH;
    }
  }
  if (timeline.pox_2_activation === undefined) {
    timeline.pox_2_activation = timeline.epoch_2_1 + 1;
  }
  if (timeline.epoch_2_2 === undefined) {
    timeline.epoch_2_2 = DEFAULT_EPOCH_TIMELINE.epoch_2_2;
    while (timeline.epoch_2_2 <= timeline.pox_2_activation) {
      timeline.epoch_2_2 += POX_CYCLE_LENGTH;
    }
  }
  if (timeline.epoch_2_3 === undefined) {
    timeline.epoch_2_3 = DEFAULT_EPOCH_TIMELINE.epoch_2_3;
    while (timeline.epoch_2_3 <= timeline.epoch_2_2) {
      timeline.epoch_2_3 += POX_CYCLE_LENGTH;
    }
  }
  if (timeline.epoch_2_4 === undefined) {
    timeline.epoch_2_4 = DEFAULT_EPOCH_TIMELINE.epoch_2_4;
    while (timeline.epoch_2_4 <= timeline.epoch_2_3) {
      timeline.epoch_2_4 += POX_CYCLE_LENGTH;
    }
  }
  return timeline;
}

export function buildDevnetNetworkOrchestrator(
  networkId: number,
  timeline: EpochTimeline = DEFAULT_EPOCH_TIMELINE,
  logs = false,
  stacks_node_image_url?: string
) {
  let uuid = Date.now();
  let working_dir = `/tmp/stacks-test-${uuid}-${networkId}`;
  // Fill in default values for any unspecified epochs
  let full_timeline = fillTimeline(timeline);
  // Set the stacks-node image URL to the default image for the version if it's
  // not explicitly set
  if (stacks_node_image_url === undefined) {
    stacks_node_image_url = process.env.CUSTOM_STACKS_NODE;
  }
  let config = {
    logs,
    devnet: {
      name: `ephemeral-devnet-${uuid}`,
      bitcoin_controller_block_time: Constants.BITCOIN_BLOCK_TIME,
      epoch_2_0: full_timeline.epoch_2_0,
      epoch_2_05: full_timeline.epoch_2_05,
      epoch_2_1: full_timeline.epoch_2_1,
      pox_2_activation: full_timeline.pox_2_activation,
      epoch_2_2: full_timeline.epoch_2_2,
      epoch_2_3: full_timeline.epoch_2_3,
      epoch_2_4: full_timeline.epoch_2_4,
      bitcoin_controller_automining_disabled: false,
      working_dir,
      use_docker_gateway_routing: process.env.GITHUB_ACTIONS ? true : false,
      ...(stacks_node_image_url !== undefined && {
        stacks_node_image_url,
      }),
    },
  };
  let consolidatedConfig = getIsolatedNetworkConfigUsingNetworkId(
    networkId,
    config
  );
  let orchestrator = new DevnetNetworkOrchestrator(consolidatedConfig, 2500);
  return orchestrator;
}
export const getBitcoinBlockHeight = (
  chainUpdate: StacksChainUpdate
): number => {
  let metadata = chainUpdate.new_blocks[0].block
    .metadata! as StacksBlockMetadata;
  return metadata.bitcoin_anchor_block_identifier.index;
};

export const waitForStacksTransaction = async (
  orchestrator: DevnetNetworkOrchestrator,
  txid: string
): Promise<[StacksBlockMetadata, StacksTransactionMetadata]> => {
  let { chainUpdate, transaction } =
    await orchestrator.waitForStacksBlockIncludingTransaction(txid);
  return [
    <StacksBlockMetadata>chainUpdate.new_blocks[0].block.metadata,
    <StacksTransactionMetadata>transaction.metadata,
  ];
};

export const getNetworkIdFromEnv = (): number => {
  let networkId = process.env.JEST_WORKER_ID
    ? parseInt(process.env.JEST_WORKER_ID!)
    : process.env.VITEST_WORKER_ID
    ? parseInt(process.env.VITEST_WORKER_ID!)
    : 1;
  return networkId;
};

export const getChainInfo = async (
  network: StacksNetwork,
  retry?: number
): Promise<any> => {
  let retryCountdown = retry ? retry : 20;
  if (retryCountdown == 0) return Promise.reject();
  try {
    let response = await fetch(network.getInfoUrl(), {});
    let info = await response.json();
    return info;
  } catch (e) {
    await delay();
    return await getChainInfo(network, retryCountdown - 1);
  }
};

export const getPoxInfo = async (
  network: StacksNetwork,
  retry?: number
): Promise<any> => {
  let retryCountdown = retry ? retry : 20;
  if (retryCountdown == 0) return Promise.reject();
  try {
    let response = await fetch(network.getPoxInfoUrl(), {});
    let poxInfo = await response.json();
    return poxInfo;
  } catch (e) {
    await delay();
    return await getPoxInfo(network, retryCountdown - 1);
  }
};

export const getAccount = async (
  network: StacksNetwork,
  address: string,
  retry?: number
): Promise<any> => {
  let retryCountdown = retry ? retry : 20;
  if (retryCountdown == 0) return Promise.reject();
  try {
    let response = await fetch(network.getAccountApiUrl(address), {});
    let payload: any = await response.json();
    return {
      balance: BigInt(payload.balance),
      locked: BigInt(payload.locked),
      unlock_height: payload.unlock_height,
      nonce: payload.nonce,
    };
  } catch (e) {
    await delay();
    return await getAccount(network, address, retryCountdown - 1);
  }
};

export const getBitcoinHeightOfNextRewardPhase = async (
  network: StacksNetwork,
  retry?: number
): Promise<number> => {
  let response = await getPoxInfo(network, retry);
  return response.next_cycle.reward_phase_start_block_height;
};

export const getBitcoinHeightOfNextPreparePhase = async (
  network: StacksNetwork,
  retry?: number
): Promise<number> => {
  let response = await getPoxInfo(network, retry);
  return response.next_cycle.prepare_phase_start_block_height;
};

export const waitForNextPreparePhase = async (
  network: StacksNetwork,
  orchestrator: DevnetNetworkOrchestrator,
  offset?: number
): Promise<StacksChainUpdate> => {
  var height = await getBitcoinHeightOfNextPreparePhase(network);
  if (offset) {
    height = height + offset;
  }
  return await orchestrator.waitForStacksBlockAnchoredOnBitcoinBlockOfHeight(
    height
  );
};

export const waitForRewardCycleId = async (
  network: StacksNetwork,
  orchestrator: DevnetNetworkOrchestrator,
  id: number,
  offset?: number
): Promise<StacksChainUpdate> => {
  let response = await getPoxInfo(network);
  let height =
    response.first_burnchain_block_height + id * response.reward_cycle_length;
  if (offset) {
    height = height + offset;
  }
  return await orchestrator.waitForStacksBlockAnchoredOnBitcoinBlockOfHeight(
    height
  );
};

export const waitForNextRewardPhase = async (
  network: StacksNetwork,
  orchestrator: DevnetNetworkOrchestrator,
  offset?: number
): Promise<StacksChainUpdate> => {
  var height = await getBitcoinHeightOfNextRewardPhase(network);
  if (offset) {
    height = height + offset;
  }
  return await orchestrator.waitForStacksBlockAnchoredOnBitcoinBlockOfHeight(
    height
  );
};

export const expectAccountToBe = async (
  network: StacksNetwork,
  address: string,
  account: number,
  locked: number
) => {
  let wallet = await getAccount(network, address);
  expect(wallet.balance).toBe(BigInt(account));
  expect(wallet.locked).toBe(BigInt(locked));
};

export async function handleContractCall({
  txOptions,
  network,
}: {
  txOptions: any;
  network: StacksNetwork;
}) {
  // @ts-ignore
  const tx = await makeContractCall(txOptions);
  // Broadcast transaction to our Devnet stacks node
  const response = await broadcastTransaction(tx, network);
  expect(
    response.error,
    "tx failed\n" + response.reason + " " + JSON.stringify(response.reason_data)
  ).toBeUndefined();
  return response;
}

export const broadcastStackSTX = async (
  poxVersion: number,
  network: StacksNetwork,
  amount: number,
  account: Account,
  blockHeight: number,
  cycles: number,
  fee: number,
  nonce: number
): Promise<TxBroadcastResult> => {
  const addressCV = decodeBtcAddressToCV(account.btcAddress);

  const txOptions = {
    contractAddress: Contracts.POX_1.address,
    contractName: poxVersion == 1 ? Contracts.POX_1.name : Contracts.POX_3.name,
    functionName: "stack-stx",
    functionArgs: [
      uintCV(amount),
      addressCV,
      uintCV(blockHeight),
      uintCV(cycles),
    ],
    fee,
    nonce,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    senderKey: account.secretKey,
  };
  // @ts-ignore
  const tx = await makeContractCall(txOptions);
  // Broadcast transaction to our Devnet stacks node
  const response = await broadcastTransaction(tx, network);
  return response;
};

export async function deployContract(
  network: StacksNetwork,
  sender: Account,
  nonce: number,
  contractName: string,
  codeBody: string
) {
  // Build the transaction to deploy the contract
  let deployTxOptions = {
    senderKey: sender.secretKey,
    contractName,
    codeBody,
    fee: 10000000,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    nonce,
    clarityVersion: undefined,
  };

  let transaction = await makeContractDeploy(deployTxOptions);
  let response = await broadcastTransaction(transaction, network);
  expect(
    response.error,
    `${JSON.stringify(response.reason_data)} - ${response.reason}`
  ).toBeUndefined();
  return { transaction, response };
}

export function decodeBtcAddressToCV(btcAddress: string) {
  const { version, data } = decodeBtcAddress(btcAddress);
  // @ts-ignore
  const address = {
    version: bufferCV(toBytes(new Uint8Array([version.valueOf()]))),
    hashbytes: bufferCV(data),
  };
  return tupleCV(address);
}


export async function asyncExpectCurrentCycleIdToBe(
  cycleId: number,
  network: StacksTestnet
) {
  let poxInfo = await getPoxInfo(network);
  console.log("PoxInfo", poxInfo);
  expect(poxInfo.current_cycle.id).toBe(cycleId);
}
