# weekly59
solidity nextjs hardhat typescript

- Solidity 0.8.9
- Nextjs 12.2.2
- Hardhat 2.10.1

<https://nextjs.org/learn/basics/create-nextjs-app>

- Create Next App Typescript
```
npx creat-next-app blog4 --typescript
```

- Layout from weekly57
```
cd blog4
mkdir components
cp ../../weekly57/blog3/components/* components/
cp ../../weekly57/blog3/styles/* styles/
cp ../../weekly57/blog3/public/* public/
```

- Nodejs version 18
```
nvm install 18
nvm use 18

node --version
v18.3.0
```

<https://hardhat.org/tutorial/creating-a-new-hardhat-project>

- Creating hardhat environment by hardhat team
```
npm install -D hardhat
rm README.md tsconfig.json
```

- tsconfig.json
```
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```
- [error] try to hardhat compile ... :o
```
npx hardhat compile
Error HH13: Your Hardhat project uses typescript, but ts-node is not installed.
      
Please run: npm install --save-dev ts-node
```

- [ok] fix install ts-node ;)
```
npm install -D ts-node
```

- [error] try to hardhat compile ... :o
```
 npx hardhat compile
An unexpected error occurred:

/home/debian/projects/weekly59/blog4/hardhat.config.ts:1
import "@nomicfoundation/hardhat-toolbox";
^^^^^^
```

- [ok] install hardhat-toolbox dependencies ;)
```
npm install -D @nomicfoundation/hardhat-toolbox
```

- [error]
```
npx hardhat compile
An unexpected error occurred:

/home/debian/projects/weekly59/blog4/hardhat.config.ts:1
import "@nomicfoundation/hardhat-toolbox";
^^^^^^

SyntaxError: Cannot use import statement outside a module
```

- [ok] 
```
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "CommonJS",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

- [ok] now hardhat compile ;)
```
npx hardhat compile
Generating typings for: 2 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 6 typings!
Compiled 2 Solidity files successfully
```

- [ok] run hardhat test, just before touching any solidity code, is part of hardhat team work ;)
```
npx hardhat test
  Lock
    Deployment
      ✔ Should set the right unlockTime (1637ms)
      ✔ Should set the right owner
      ✔ Should receive and store the funds to lock
      ✔ Should fail if the unlockTime is not in the future (92ms)
    Withdrawals
      Validations
Unlock time is '1689365381' and block timestamp is '1657829383'
        ✔ Should revert with the right error if called too soon (81ms)
Unlock time is '1689365381' and block timestamp is '1689365382'
        ✔ Should revert with the right error if called from another account (99ms)
Unlock time is '1689365381' and block timestamp is '1689365382'
        ✔ Shouldn't fail if the unlockTime has arrived and the owner calls it (95ms)
      Events
Unlock time is '1689365381' and block timestamp is '1689365382'
        ✔ Should emit an event on withdrawals (81ms)
      Transfers
Unlock time is '1689365381' and block timestamp is '1689365382'
        ✔ Should transfer the funds to the owner (73ms)
  9 passing (2s)
```

-----

<https://buildmedia.readthedocs.org/media/pdf/solidity/develop/solidity.pdf>

<https://docs.soliditylang.org/en/v0.8.14/control-structures.html#panic-via-assert-and-error-via-require>

<https://hardhat.org/hardhat-chai-matchers/docs/reference#.revertedwithpanic>

------
-----
- contracts/SafeMath.sol 0.8 strict math overflow
```tsx
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
```
- test/SafeMath.ts solidity 0.8 overflow test PANIC ARITHMETIC OVERFLOW
```tsx
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";
import { expect } from "chai";
import { ethers } from "hardhat";
describe(`SafeMath`, () => {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const SafeMath = await ethers.getContractFactory("SafeMath");
    const safeMath = await SafeMath.deploy();
    return { safeMath, owner, otherAccount };
  }

  describe(`Deployment Safe Math`, () => {
    it(`Should check Underflow OK`, async () => {
      const { safeMath } = await loadFixture(deployFixture);
      // <https://hardhat.org/hardhat-chai-matchers/docs/reference#.revertedwithpanic>
      await expect(safeMath.testUnderflow()).to.be
      .revertedWithPanic( PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW ) ;
    });
    it(`Should NOT check or uncheck Underflow calculus error prone.`, async () => {
      const { safeMath } = await loadFixture(deployFixture);
      await expect(safeMath.testUncheckedUndeflow()).to.be.not.null;
    });
  });
});
```
- test result
```
npx hardhat test
  SafeMath
    Deployment Safe Math
      ✔ Should check Underflow OK (101ms)
      ✔ Should NOT check or uncheck Underflow mmmm calculus error prone.
```

------
------

- Custom Error solidity and test with Hardhat
<https://docs.soliditylang.org/en/v0.8.14/contracts.html#errors-and-the-revert-statement>
```tsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
error VENDING_MACHINE__UNAUTORIZED(); // custom error
// <https://docs.soliditylang.org/en/v0.8.14/contracts.html#errors-and-the-revert-statement>
contract VendingMachine {
  address payable owner = payable(msg.sender);
  function withdraw() public {
    if(msg.sender == owner) // == instead of != only for testing purposes
      revert VENDING_MACHINE__UNAUTORIZED(); 
    owner.transfer( address(this).balance );
  }
}
```
<https://hardhat.org/hardhat-chai-matchers/docs/reference#.revertedwithcustomerror>
```tsx
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe(`VendingMachine`, () => {

  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const VendingMachine = await ethers.getContractFactory("VendingMachine");
    const vendingMachine = await VendingMachine.deploy();
    return { vendingMachine, owner, otherAccount };
  }

  describe(`Deployment VendingMachine`, () => {
    it(`Should Custom Error OK`, async () => {
      const { vendingMachine, otherAccount } = await loadFixture(deployFixture);
      await expect(vendingMachine.withdraw()).to.be
         .revertedWithCustomError( vendingMachine,"VENDING_MACHINE__UNAUTORIZED" ) ;
      //<https://hardhat.org/hardhat-chai-matchers/docs/reference#.revertedwithcustomerror>
    });
  });
});

```

------
------



