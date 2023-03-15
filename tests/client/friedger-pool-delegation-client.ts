import { Chain, Tx, types, Account } from "../deps.ts";

export function delegateStx(
  amount: number,
  user: Account
) {
  return Tx.contractCall(
    "friedger-pool-delegation",
    "delegate-stx",
    [
      types.uint(amount),
    ],
    user.address
  );
}
