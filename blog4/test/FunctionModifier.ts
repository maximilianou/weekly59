import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";
import { expect } from "chai";
import { ethers } from "hardhat";

describe(`FunctionModifier`, () => {

  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const FunctionModifier = await ethers.getContractFactory("FunctionModifier");
    const functionModifier = await FunctionModifier.deploy();
    return { functionModifier, owner, otherAccount };
  }

  describe(`Deployment FunctionModifier`, () => {
    it(`Should increment`, async () => {
      const { functionModifier } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await functionModifier.count() ).to.be.equal(0);
      expect( await functionModifier.inc() ).to.be.not.reverted; // look where the await is ;)
      expect( await functionModifier.count() ).to.be.equal(1);
    });
    it(`Should decrement`, async () => {
      const { functionModifier } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await functionModifier.count() ).to.be.equal(0);
      expect( await functionModifier.inc() ).to.be.not.reverted; // look where the await is ;)
      expect( await functionModifier.count() ).to.be.equal(1);
      expect( await functionModifier.dec() ).to.be.not.reverted; // look where the await is ;)
      expect( await functionModifier.count() ).to.be.equal(0);
    });
    it(`Should Revert "Paused" - modifier `, async () => {
      const { functionModifier } = await loadFixture(deployFixture); // Give an instance 3 of the contract counter
      await functionModifier.setPaused(true);
      await expect( functionModifier.dec() ).to.be
      .revertedWith( "Paused" ); // look where the await is ;)
    });
    it(`Should Revert "x >= 100" - modifier `, async () => {
      const { functionModifier } = await loadFixture(deployFixture); // Give an instance 3 of the contract counter
      await expect( functionModifier.incBy(200) ).to.be
      .revertedWith( "x >= 100" ); // look where the await is ;)
    });

  });
});