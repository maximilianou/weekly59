import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";
import { expect } from "chai";
import { ethers } from "hardhat";

describe(`Counter`, () => {

  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    return { counter, owner, otherAccount };
  }

  describe(`Deployment Counter`, () => {
    it(`Should increment storage data in contract Counter`, async () => {
      const { counter } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await counter.count() ).to.be.equal(0);
      expect( await counter.inc() ).to.be.not.reverted; // look where the await is ;)
      expect( await counter.count() ).to.be.equal(1);
    });
    it(`Should decrement storage data in counter to 0 [ok]`, async () => {
      const { counter } = await loadFixture(deployFixture); // Give an instance 2 of the contract counter
      expect( await counter.count() ).to.be.equal(0);
      expect( await counter.inc() ).to.be.not.reverted; // look where the await is ;)
      expect( await counter.count() ).to.be.equal(1);
      expect( await counter.dec() ).to.be.not.reverted; // look where the await is ;)
      expect( await counter.count() ).to.be.equal(0);
    });
    it(`Should decrement Reject Arithmetic Underflow `, async () => {
      const { counter } = await loadFixture(deployFixture); // Give an instance 3 of the contract counter
      await expect( counter.dec() ).to.be
      .revertedWithPanic( PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW ); // look where the await is ;)
    });
  });
});