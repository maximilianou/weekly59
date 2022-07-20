// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
error ACCESS_CONTROL__NOT_AUTHORIZED();
contract AccessControl {
  event GrantRole(bytes32 indexed role, address indexed account);
  event RevokeRole(bytes32 indexed role, address indexed account);
  mapping(bytes32 => mapping(address => bool)) public roles;
  bytes32 private constant ADMIN = keccak256(abi.encodePacked("ADMIN"));
  bytes32 private constant USER = keccak256(abi.encodePacked("USER"));
  modifier onlyRole(bytes32 _role){
    if( roles[_role][msg.sender] != true ){
      revert ACCESS_CONTROL__NOT_AUTHORIZED();
    }
    _;
  }
  constructor(){
    _grantRoles(ADMIN, msg.sender);
  }
  function _grantRoles(bytes32 _role, address _account) internal {
    roles[_role][_account] = true; 
    emit GrantRole(_role, _account);
  }
  function grantRole(bytes32 _role, address _account) external onlyRole(ADMIN) {
    _grantRoles(_role, _account);
  }
  function revokeRole(bytes32 _role, address _account) external onlyRole(ADMIN) {
    roles[_role][_account] = false; 
    emit RevokeRole(_role, _account);
  }
   
}