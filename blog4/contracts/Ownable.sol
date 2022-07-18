// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
error OWNABLE__NOT_OWNER();
error OWNABLE__INVALID_ADDRESS();
contract Ownable {
  address public owner;
  constructor(){
    owner = msg.sender;
  }
  modifier onlyOwner() {
    if ( msg.sender != owner ) {
      revert OWNABLE__NOT_OWNER();
    }
    _; // continue execution of main thread
  }
  function setOwner(address _newOwner) external onlyOwner {
    if( _newOwner ==  owner ){ //address(0) ){
      revert OWNABLE__INVALID_ADDRESS();
    }
    owner = _newOwner;
  }
  function onlyOwnerCanCallThisFunction() external onlyOwner {
    
  }
  function anyOneCanCallThisFunction() external {

  }
}