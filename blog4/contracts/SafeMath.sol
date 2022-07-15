// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract SafeMath {
  function testUnderflow() public pure returns (uint) {
    uint x = 0;
    x--; // check safe underflow ;)
    return x;
  }
  function testUncheckedUndeflow() public pure returns (int){
    int x = 0;
    unchecked { // out of safe check underflow :o
      x--; 
    }
    return x;
  }
}
