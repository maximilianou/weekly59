// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
error ETHERWALLET__NOT_OWNER();
contract EtherWallet {
  address payable public owner;
  constructor() payable {
    owner = payable(msg.sender);
  }
  receive() external payable {    
  }
  function withdraw(uint _amount) external {
    if( msg.sender != owner ){
      revert ETHERWALLET__NOT_OWNER();
    }
    payable(msg.sender).transfer(_amount);
  }
  function getBalance() external view returns (uint) {
    return address(this).balance;
  }
}