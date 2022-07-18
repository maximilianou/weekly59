import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
describe(`Events`, () => {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Events = await ethers.getContractFactory("Events");
    const events = await Events.deploy();
    return { events, owner, otherAccount };
  }
  describe(`Deployment Events`, () => {
    it(`Should check Event emit Log`, async () => {
      const { events } = await loadFixture(deployFixture);
      await expect( events.example() ).to.be.emit(events, "Log"); // Goooood ;)
      assert.isOk;
    });
  });
});
