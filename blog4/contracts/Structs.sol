// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
contract Structs {
  struct Car {
    string model;
    uint year;
    address owner;
  }
  Car public car;
  Car[] public cars;
  mapping( address => Car[] ) public carsByOwner;
  function examples() external  {
    Car memory toyota = Car("Toyota", 2020, msg.sender); // memory execution of the funcion
    Car memory lambo =  Car({ model: "Lamborghini", year: 2020, owner: msg.sender});
    // memory - ReadOnly data
    // storage - Write data in storage/blockchain state
    cars.push(toyota);
    cars.push(lambo);
    carsByOwner[msg.sender] = cars;
  }
  function exampleCallable(uint[] calldata y) external pure { // calldata by reference, memory by value
    _internal(y);
  }
  function _internal(uint[] memory _y) private pure {
    uint x = _y[0];
    x;
  }
}
