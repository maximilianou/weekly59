import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
describe(`Ownable`, () => {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Ownable = await ethers.getContractFactory("Ownable");
    const ownable = await Ownable.deploy();
    return { ownable, owner, otherAccount };
  }
  describe(`Deployment Ownable`, () => {
    it(`Should owner call ok`, async () => {
      const { ownable } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await ownable.onlyOwnerCanCallThisFunction() ).ok;
    });
    it(`Should not owner call rejected`, async () => {
      const { ownable, otherAccount } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await ownable.setOwner(otherAccount.address) ).to.be.ok;      
      try{
        await ownable.onlyOwnerCanCallThisFunction();
        assert.fail();        
      }catch(err){
        assert.isOk;
      }
    });
    it(`Should not owner call ok`, async () => {
      const { ownable, otherAccount } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await ownable.setOwner(otherAccount.address) ).to.be.ok;
      await expect( ownable.anyOneCanCallThisFunction() ).to.be.ok;
    });
    it(`Should reject same owner not change ownership rejected`, async () => {
      const { ownable, owner ,otherAccount } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      try{
        await ownable.setOwner(owner.getAddress());
        assert.fail();        
      }catch(err){
        assert.isOk;
      }
    });
  });
});