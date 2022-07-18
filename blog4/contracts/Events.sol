// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
contract Events {
  event Log(string message, uint val);
  function example() external { // is a transactional function, not readonly or view because of the emit data
    emit Log("Thing the best of Others", 123456);
  }
}