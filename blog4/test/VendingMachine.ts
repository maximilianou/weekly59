import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe(`VendingMachine`, () => {

  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const VendingMachine = await ethers.getContractFactory("VendingMachine");
    const vendingMachine = await VendingMachine.deploy();
    return { vendingMachine, owner, otherAccount };
  }

  describe(`Deployment VendingMachine`, () => {
    it(`Should Custom Error OK`, async () => {
      const { vendingMachine, otherAccount } = await loadFixture(deployFixture);
      await expect(vendingMachine.withdraw()).to.be
         .revertedWithCustomError( vendingMachine,"VENDING_MACHINE__UNAUTORIZED" ) ;
      //<https://hardhat.org/hardhat-chai-matchers/docs/reference#.revertedwithcustomerror>
    });
  });
});

function otherAccount(otherAccount: any, arg1: string) {
  throw new Error("Function not implemented.");
}
