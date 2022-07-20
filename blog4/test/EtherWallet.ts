import {  loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
describe("EtherWallet", function () {
  async function deployOne() {
    const ONE_GWEI = 1_000_000_000;
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    const etherWallet = await EtherWallet.deploy( );
    return { etherWallet, owner, otherAccount, ONE_GWEI };
  }
  describe("Deployment EtherWallet", function () {
    it("Should set the right owner", async function () {
      const { owner, etherWallet } = await loadFixture(deployOne);
      expect(await etherWallet.owner()).to.equal(owner.address);
    });
    it("Should have 0 funds", async function () {
      const { etherWallet, ONE_GWEI } = await loadFixture(deployOne);
      expect(await ethers.provider.getBalance(etherWallet.address)).to.equal(0);
    });
    it.skip("Should receive and store the funds", async function () {
      const { etherWallet, ONE_GWEI } = await loadFixture(deployOne);
//      await etherWallet.({to: etherWallet.address, value: ONE_GWEI});
//      await ethers.utils.provider.sendTransaction(etherWallet.address, [{ value:  1000000000 }]);      
      expect(await ethers.provider.getBalance(etherWallet.address)).to.equal(ONE_GWEI);
    });
  });
});
