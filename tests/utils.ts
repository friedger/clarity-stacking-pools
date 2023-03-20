import { Account, Chain } from "./deps.ts";
import {
  getPartialStackedByCycle,
  getRewardSetPoxAddress,
} from "./client/pox-2-client.ts";
import { poxAddrPool1 } from "./constants.ts";

export function expectPartialStackedByCycle(
  poxAddr: { version: string; hashbytes: string },
  cycle: number,
  amountUstx: number | undefined,
  chain: Chain,
  deployer: Account
) {
  const result = getPartialStackedByCycle(
    poxAddr,
    cycle,
    `${deployer.address}.pox-pool-self-service`,
    chain,
    deployer
  ).result;
  if (amountUstx) {
    result.expectSome().expectTuple()["stacked-amount"].expectUint(amountUstx);
  } else {
    result.expectNone();
  }
}

export function expectTotalStackedByCycle(
  cycle: number,
  index: number,
  amountUstx: number,
  chain: Chain,
  user: Account
) {
  const result = getRewardSetPoxAddress(cycle, index, chain, user).result;
  if (amountUstx) {
    result.expectSome().expectTuple()["total-ustx"].expectUint(amountUstx);
  } else {
    result.expectNone();
  }
}
