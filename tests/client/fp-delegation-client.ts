import { Chain, Tx, types, Account } from "../deps.ts";

export function delegateStx(amount: number, user: Account) {
  return Tx.contractCall(
    "fp-delegation",
    "delegate-stx",
    [types.uint(amount)],
    user.address
  );
}

export function delegateStackStx(
  amountUstx: number,
  stacker: Account,
  user: Account
) {
  return Tx.contractCall(
    "fp-delegation",
    "delegate-stack-stx",
    [types.uint(amountUstx), types.principal(stacker.address)],
    user.address
  );
}
