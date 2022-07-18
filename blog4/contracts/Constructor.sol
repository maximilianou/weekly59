// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
// Import this file to use console.log
import "hardhat/console.sol";
contract Constructor { // this name Constuctor can be contract Banana but methods **constructor()** is reserved for any contractName as **constructor**
  address public owner;
  uint public x;
  constructor(uint _x){
    owner = msg.sender;
    x = _x;
    console.log("msg.sender:  %s", msg.sender);
    //console.log("msg.value: %o", msg.value); // only on payable constructor
    //console.log("msg.sig:   %o", msg.sig); 
    //console.log("msg.data:  %o", msg.data);    
    console.log("tx.origin:  %s", tx.origin);
    console.log("tx.gasprice:  %s", tx.gasprice);
    console.log("block.timestamp:  %s", block.timestamp);
    console.log("block.number:  %s", block.number);
    console.log("block.chainid:  %s", block.chainid);
  }
}