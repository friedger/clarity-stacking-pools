import { Chain, Tx, types, Account } from "../deps.ts";

export function fpDelegationAllowContractCaller(
  contractCaller: string,
  untilBurnHt: number | undefined,
  user: Account
) {
  return Tx.contractCall(
    "pox-pool-self-service",
    "allow-contract-caller",
    [
      types.principal(contractCaller),
      untilBurnHt ? types.some(types.uint(untilBurnHt)) : types.none(),
    ],
    user.address
  );
}

export function delegateStx(amount: number, user: Account) {
  return Tx.contractCall(
    "pox-pool-self-service",
    "delegate-stx",
    [types.uint(amount)],
    user.address
  );
}

export function delegateStackStx(
  stacker: Account,
  user: Account
) {
  return Tx.contractCall(
    "pox-pool-self-service",
    "delegate-stack-stx",
    [types.principal(stacker.address)],
    user.address
  );
}

export function delegateStackStxMany(stackers: Account[], user: Account) {
  return Tx.contractCall(
    "pox-pool-self-service",
    "delegate-stack-stx-many",
    [types.list(stackers.map((s) => types.principal(s.address)))],
    user.address
  );
}