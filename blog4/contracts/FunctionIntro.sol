// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

// import "hardhat/console.sol";
// function log( uint msg ){
//   console.log( msg );
// }

contract FunctionIntro {
  function add(uint x, uint y) external pure returns (uint) {
    return x + y;
  }
  function sub(uint x, uint y) external pure returns (uint) {
    return x - y;
  }
}