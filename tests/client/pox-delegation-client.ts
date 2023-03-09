import { Chain, Tx, types, Account } from "../deps.ts";

export function delegateStx(
  amount: number,
  poolAddress: string,
  untilBurnHt: number | undefined,
  poolPoxAddr: { version: string; hashbytes: string } | undefined,
  userPoxAddr: { version: string; hashbytes: string },
  lockingPeriod: number,
  user: Account
) {
  return Tx.contractCall(
    "pox-delegation",
    "delegate-stx",
    [
      types.uint(amount),
      types.principal(poolAddress),
      untilBurnHt ? types.some(types.uint(untilBurnHt)) : types.none(),
      poolPoxAddr ? types.some(types.tuple(poolPoxAddr)) : types.none(),
      types.tuple(userPoxAddr),
      types.uint(lockingPeriod),
    ],
    user.address
  );
}

export function delegateStackStx(
  members: { user: Account; amountUstx: number }[],
  poolPoxAddr: { version: string; hashbytes: string },
  startBurnHt: number,
  lockingPeriod: number,
  poolOperator: Account
) {
  return Tx.contractCall(
    "pox-delegation",
    "delegate-stack-stx",
    [
      types.list(
        members.map((m) =>
          types.tuple({
            user: types.principal(m.user.address),
            "amount-ustx": types.uint(m.amountUstx),
          })
        )
      ),

      types.tuple(poolPoxAddr),
      types.uint(startBurnHt),
      types.uint(lockingPeriod),
    ],
    poolOperator.address
  );
}

export function getStatusListsLastIndex(
  poolAddress: string,
  cycle: number,
  lockingPeriod: number,
  chain: Chain,
  user: Account
) {
  return chain.callReadOnlyFn(
    "pox-delegation",
    "get-status-lists-last-index",
    [
      types.principal(poolAddress),
      types.uint(cycle),
      types.uint(lockingPeriod),
    ],
    user.address
  );
}

export function getStatusList(
  poolAddress: string,
  cycle: number,
  lockingPeriod: number,
  index: number,
  chain: Chain,
  user: Account
) {
  return chain.callReadOnlyFn(
    "pox-delegation",
    "get-status-list",
    [
      types.principal(poolAddress),
      types.uint(cycle),
      types.uint(lockingPeriod),
      types.uint(index),
    ],
    user.address
  );
}

export function getTotal(
  poolAddress: string,
  cycle: number,
  lockingPeriod: number,
  chain: Chain,
  user: Account
) {
  return chain.callReadOnlyFn(
    "pox-delegation",
    "get-total",
    [
      types.principal(poolAddress),
      types.uint(cycle),
      types.uint(lockingPeriod),
    ],
    user.address
  );
}

export function getStatus(
  poolAddress: string,
  userAddress: string,
  chain: Chain,
  user: Account
) {
  return chain.callReadOnlyFn(
    "pox-delegation",
    "get-status",
    [types.principal(poolAddress), types.principal(userAddress)],
    user.address
  );
}
