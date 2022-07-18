// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
contract Dad {
  function speak() public pure virtual returns (string memory){
    return "Sempre Avanti!";
  }
}
contract Son is Dad {
  function speak() public pure virtual override returns (string memory){
    return "Always Moving Forward!";
  }
}
contract Nipote is Son {
  function speak() public pure override returns (string memory){
    return "Siempre Hacia Adelante!";
  }
}