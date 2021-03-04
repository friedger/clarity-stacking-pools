import {
  Client,
  Provider,
  ProviderRegistry,
  Result,
} from "@blockstack/clarity";
import { assert, expect } from "chai";
import { ADDR1, ADDR2 } from "../mocknet";
import * as c32 from "c32check";

describe("xverse contract test suite", () => {
  let client: Client;
  let poxClient: Client;
  let provider: Provider;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client(
      "SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.xverse",
      "xverse",
      provider
    );
    poxClient = new Client(
      "ST000000000000000000002AMW42H.pox",
      "mock-pox",
      provider
    );
    expect((await poxClient.deployContract()).success).to.be.true;
  });

  it("should have a valid syntax", async () => {
    await client.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
      await client.deployContract();
    });

    it("should delegate", async () => {
      const amountUstx = 1000;
      const delegateTo = ADDR1;
      const untilBurnHt = 100;
      const [version, hashbytes] = c32.c32addressDecode(delegateTo);
      const tx = client.createTransaction({
        method: {
          name: "delegate-stx",
          args: [
            `u${amountUstx}`,
            `'${delegateTo}`,
            untilBurnHt ? `(some u${amountUstx})` : "none",
            "none",
            `(tuple (hashbytes 0x${hashbytes}) (version 0x${ADDR_STACKS_TO_BITCOIN[
              version
            ].toString(16)}))`,
            "u2",
          ],
        },
      });
      tx.sign(ADDR2);
      const receipt = await client.submitTransaction(tx);
      expect(receipt.success, JSON.stringify(receipt)).to.be.true;
    });
  });

  after(async () => {
    await provider.close();
  });
});
