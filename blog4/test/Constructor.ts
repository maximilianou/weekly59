import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
const TEST_UINT_OK = 123;
describe(`Constructor`, () => {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Constructor = await ethers.getContractFactory("Constructor");
    const constructor = await Constructor.deploy(TEST_UINT_OK);
    return { constructor, owner, otherAccount };
  }
  describe(`Deployment Constructor`, () => {
    it(`Should call Constructor, and show some debug info as tutorial weekly59`, async () => {
      const { constructor } = await loadFixture(deployFixture); // Give one **Constructor** instance.
      expect( await constructor.x() ).to.be.equal(TEST_UINT_OK);
    });
  });
});
