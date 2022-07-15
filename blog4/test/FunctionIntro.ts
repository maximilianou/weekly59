import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";
import { expect } from "chai";
import { ethers } from "hardhat";

describe(`FunctionIntro`, () => {

  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const FunctionIntro = await ethers.getContractFactory("FunctionIntro");
    const functionIntro = await FunctionIntro.deploy();
    return { functionIntro, owner, otherAccount };
  }

  describe(`Deployment FunctionIntro`, () => {
    it(`Should add a + b = c`, async () => {
      const { functionIntro } = await loadFixture(deployFixture);
      console.log( await functionIntro.add( 3, 7));
      expect( await functionIntro.add( 3, 7) ).to.be.equal(10); // look where the await is ;)
    });
    it(`Should sub Reject Arithmetic a - b = d`, async () => {
      const { functionIntro } = await loadFixture(deployFixture);
      await expect( functionIntro.sub( 3, 7) ).to.be
      .revertedWithPanic( PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW ); // look where the await is ;)
    });
    it(`Should sub a - b = d [ok]`, async () => {
      const { functionIntro } = await loadFixture(deployFixture);
      expect( await functionIntro.sub( 7, 5) ).to.be.equal(2); // look where the await is ;)
    });
  });
});