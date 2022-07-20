// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
contract Kill {
  constructor() payable {}
  function kill() external {
    selfdestruct(payable(msg.sender)); // when this contract is destroyed the balance will be passed to msg.sender account
  }
}