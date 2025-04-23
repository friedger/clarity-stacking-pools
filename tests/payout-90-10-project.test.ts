import { expectOkTrue } from "@stacks/clarunit/src/parser/test-helpers.ts";
import { Cl } from "@stacks/transactions";
import { beforeEach, describe, expect, it } from "vitest";
import {
  sendStx,
  setAdmin,
  setProject,
} from "./client/payout-90-10-project.ts";
import {
  POX4_SELF_SERVICE_MULTI_CONTRACT_NAME,
  setPoxAddressActive,
} from "./client/pox4-self-service-multi-client.ts";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet_1 = accounts.get("wallet_1")!;
const wallet_2 = accounts.get("wallet_2")!;
const wallet_3 = accounts.get("wallet_3")!;
const wallet_4 = accounts.get("wallet_4")!;

describe("payout 90:10", () => {
  beforeEach(() => {
    let block = simnet.mineBlock([
      setPoxAddressActive(
        "bc1qs0kkdpsrzh3ngqgth7mkavlwlzr7lms2zv3wxe",
        deployer
      ),
    ]);
    expectOkTrue(
      block,
      POX4_SELF_SERVICE_MULTI_CONTRACT_NAME,
      "set-pox-address-active"
    );
  });

  it("Ensure that payout happens", () => {
    let block = simnet.mineBlock([
      sendStx(20_000_000_000_000, wallet_2, wallet_1),
    ]);
    expect(block[0].events[0].data.amount).toEqual(String(18_000_000_000_000));
    expect(block[0].events[0].data.recipient).toEqual(wallet_2);
    expect(block[0].events[1].data.amount).toEqual(String(2_000_000_000_000));
    expect(block[0].events[1].data.recipient).toEqual(deployer);
  });

  it("Ensure admin can change project", () => {
    let block = simnet.mineBlock([
      setProject(wallet_3, deployer),
      setAdmin(wallet_2, deployer),
      setProject(wallet_4, deployer),
      setAdmin(wallet_3, deployer),
      setProject(wallet_4, wallet_2),
      setAdmin(wallet_3, wallet_2),
      sendStx(20_000_000_000_000, wallet_2, wallet_1),
    ]);
    expect(block[0].result).toBeOk(Cl.bool(true));
    expect(block[1].result).toBeOk(Cl.bool(true));
    expect(block[2].result).toBeErr(Cl.uint(401));
    expect(block[3].result).toBeErr(Cl.uint(401));
    expect(block[4].result).toBeOk(Cl.bool(true));
    expect(block[5].result).toBeOk(Cl.bool(true));
    expect(block[6].events[0].data.amount).toEqual(String(18_000_000_000_000));
    expect(block[6].events[0].data.recipient).toEqual(wallet_2);
    expect(block[6].events[1].data.amount).toEqual(String(2_000_000_000_000));
    expect(block[6].events[1].data.recipient).toEqual(wallet_4);
  });
});
