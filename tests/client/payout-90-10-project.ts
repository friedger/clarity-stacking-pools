import { tx } from "@hirosystems/clarinet-sdk";
import { Cl } from "@stacks/transactions";

export const PAYOUT_90_10_PROJECT_CONTRACT_NAME = "payout-90-10-project";
export const payout9010ProjectContract =
  simnet.getAccounts().get("deployer")!! +
  "." +
  PAYOUT_90_10_PROJECT_CONTRACT_NAME;

export function sendStx(amount: number, recipient: string, user: string) {
  return tx.callPublicFn(
    PAYOUT_90_10_PROJECT_CONTRACT_NAME,
    "send-many",
    [
      Cl.list([
        Cl.tuple({
          ustx: Cl.uint(amount),
          to: Cl.principal(recipient),
          memo: Cl.bufferFromHex(""),
        }),
      ]),
    ],
    user
  );
}

export function setAdmin(admin: string, user: string) {
  return tx.callPublicFn(
    PAYOUT_90_10_PROJECT_CONTRACT_NAME,
    "set-admin",
    [Cl.principal(admin)],
    user
  );
}

export function setProject(project: string, user: string) {
  return tx.callPublicFn(
    PAYOUT_90_10_PROJECT_CONTRACT_NAME,
    "set-project",
    [Cl.principal(project)],
    user
  );
}
