// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
contract FunctionModifier {
  bool public paused;
  uint public count;
  function setPaused(bool _paused) external {
    paused = _paused;
  }
  modifier whenNotPaused(){
    require(!paused, "Paused");
    _;
  }
  function inc() external whenNotPaused {
    count += 1;
  }
  function dec() external whenNotPaused {
    count -= 1;
  }
  modifier cap(uint _x){
    require(_x < 100, "x >= 100");
    // execute some code Before the main thread
    _; // execute back the main thread
    // execute some code After the main thread ( sandwich )
  }
  function incBy(uint _x) external whenNotPaused cap(_x) {
    count += _x;
  }
}