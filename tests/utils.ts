import { Account, Chain } from "./deps.ts";
import { getPartialStackedByCycle } from "./client/pox-2-client.ts";
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
    `${deployer.address}.fp-delegation`,
    chain,
    deployer
  ).result;
  if (amountUstx) {
    result.expectSome().expectTuple()["stacked-amount"].expectUint(amountUstx);
  } else {
    result.expectNone();
  }
}
