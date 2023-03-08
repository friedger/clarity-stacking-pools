import { Tx, types, Account } from "../deps.ts";


export function allowContractCaller(
  contractCaller: string,
  untilBurnHt: number | undefined,
  user: Account
) {
  return Tx.contractCall(
    "ST000000000000000000002AMW42H.pox-2",
    "allow-contract-caller",
    [
      types.principal(contractCaller),
      untilBurnHt ? types.some(types.uint(untilBurnHt)) : types.none(),
    ],
    user.address
  );
}

export function stackAggregationCommitIndexed(
  poxAddr: { version: string; hashbytes: string },
  cycle: number,
  poolOperator: Account
) {
  return Tx.contractCall(
    "ST000000000000000000002AMW42H.pox-2",
    "stack-aggregation-commit-indexed",
    [types.tuple(poxAddr), types.uint(cycle)],
    poolOperator.address
  );
}
