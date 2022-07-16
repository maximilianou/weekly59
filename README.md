# weekly59 - 20220715

Onboarding Solidity Hardhat Typescript TDD Nextjs

### step 1 - environment

- Solidity 0.8.9
- Nextjs 12.2.2
- Hardhat 2.10.1

<https://nextjs.org/learn/basics/create-nextjs-app>

- Create Next App Typescript 
  - Starting point
  - Just the tools, 
  - Default as we can,
  - Fresh Power of Teams Frameworks ;) 
  - ( do Not clone boilerplate )
```
npx creat-next-app blog4 --typescript
```

- Layout from weekly57 
  - hand written React, css, html
  - Simple menu hardcoded from <https://www.w3school.com>
  - Simple paralax from <https://w3school.com>
```
cd blog4
mkdir components
cp ../../weekly57/blog3/components/* components/
cp ../../weekly57/blog3/styles/* styles/
cp ../../weekly57/blog3/public/* public/
```

- Nodejs version 18 
  - @latest
  - Always start with the @latest 
  - Or testing or beta, but not LTS ( is my personal opinion, break and fix or inform ;)
  
```
nvm install 18
nvm use 18
node --version
v18.3.0
```

<https://hardhat.org/tutorial/creating-a-new-hardhat-project>

- Creating hardhat environment 
  - By **hardhat team** <https://hardhat.org/>
```
npm install -D hardhat
rm README.md tsconfig.json
```

- tsconfig.json
  - take care **module: esnext** 
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
- [error] try to hardhat compile at once ... :o
  - But I mix create-next-app and hardhat creation
  - Step by step, baby steps 
  
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
  - I am missing something, lets read the error and docs
```
 npx hardhat compile
An unexpected error occurred:

/home/debian/projects/weekly59/blog4/hardhat.config.ts:1
import "@nomicfoundation/hardhat-toolbox";
^^^^^^
```

- [ok] install hardhat-toolbox dependencies ;)
  - Just reading the docs <https://hardhat.org>, **Thank you Hardhat Team!!**
```
npm install -D @nomicfoundation/hardhat-toolbox
```

- [error]
  - HO, I have to read the error :() 
```
npx hardhat compile
An unexpected error occurred:

/home/debian/projects/weekly59/blog4/hardhat.config.ts:1
import "@nomicfoundation/hardhat-toolbox";
^^^^^^

SyntaxError: Cannot use import statement outside a module
```

- [ok] 
  - Again! Thanks **Nextjs Team** and **Hardhat Team** 
  - **module: CommonJS**
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

- [ok] run hardhat test 
  - Just before touching any solidity code
  - Hardhat team exelent work ;)
  - With Complete Sample :()

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
### step 2 - Start Solidity by TDD Typescript Hardhat 
------
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
  - I need to write code
  - Step by step 
  
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
- [ok] test result
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
  - This is interesting 0.8 
  - **Naming Error Code** 
  - can **Share code many contracts**  
  
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
- [ok] 
  - Custom Error Code ( Naming Error Code ) :()
  - TDD Catch rejection ;)  
   
```
  VendingMachine
    Deployment VendingMachine
      ✔ Should Custom Error OK (132ms)
```

------
------

#### tdd function ok / rejected SafeMath inside function

- contracts/FunctionIntro.sol  
```ts
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
```
- test/FunctionIntro.ts
```ts
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";
import { expect } from "chai";
import { ethers } from "hardhat";

describe(`FunctionIntro`, () => {

  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const FunctionIntro = await ethers.getContractFactory("FunctionIntro");
    const functionIntro = await FunctionIntro.deploy();
    return { functionIntro, owner, otherAccount };
  }

  describe(`Deployment FunctionIntro`, () => {
    it(`Should add a + b = c`, async () => {
      const { functionIntro } = await loadFixture(deployFixture);
      console.log( await functionIntro.add( 3, 7));
      expect( await functionIntro.add( 3, 7) ).to.be.equal(10); // look where the await is ;)
    });
    it(`Should sub Reject Arithmetic a - b = d`, async () => {
      const { functionIntro } = await loadFixture(deployFixture);
      await expect( functionIntro.sub( 3, 7) ).to.be
      .revertedWithPanic( PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW ); // look where the await is ;)
    });
    it(`Should sub a - b = d [ok]`, async () => {
      const { functionIntro } = await loadFixture(deployFixture);
      expect( await functionIntro.sub( 7, 5) ).to.be.equal(2); // look where the await is ;)
    });
  });
});
```
- [ok] Verify tdd functions 
  - change state
  - rejection status 
```
  FunctionIntro
    Deployment FunctionIntro
BigNumber { value: "10" }
      ✔ Should add a + b = c (167ms)
      ✔ Should sub Reject Arithmetic a - b = d (38ms)
      ✔ Should sub a - b = d [ok]

```

------
### STEP 3 - Solidity Contract looking for storage memory instance Typescript TDD Hardhat
------

- contracts/Counter.sol
```ts
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract Counter {
  uint public count;
  function inc() external {
    count += 1;
  }
  function dec() external {
    count -= 1;
  }
}
```
- test/Counter.ts
```ts
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";
import { expect } from "chai";
import { ethers } from "hardhat";

describe(`Counter`, () => {

  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    return { counter, owner, otherAccount };
  }

  describe(`Deployment Counter`, () => {
    it(`Should increment storage data in contract Counter`, async () => {
      const { counter } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await counter.count() ).to.be.equal(0);
      expect( await counter.inc() ).to.be.not.reverted; // look where the await is ;)
      expect( await counter.count() ).to.be.equal(1);
    });
    it(`Should decrement storage data in counter to 0 [ok]`, async () => {
      const { counter } = await loadFixture(deployFixture); // Give an instance 2 of the contract counter
      expect( await counter.count() ).to.be.equal(0);
      expect( await counter.inc() ).to.be.not.reverted; // look where the await is ;)
      expect( await counter.count() ).to.be.equal(1);
      expect( await counter.dec() ).to.be.not.reverted; // look where the await is ;)
      expect( await counter.count() ).to.be.equal(0);
    });
    it(`Should decrement Reject Arithmetic Underflow `, async () => {
      const { counter } = await loadFixture(deployFixture); // Give an instance 3 of the contract counter
      await expect( counter.dec() ).to.be
      .revertedWithPanic( PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW ); // look where the await is ;)
    });
  });
});
```

- [ok] Result
  - Instance variable in blockchain contract
  - Change state variable in blockchain 
  - Catch rejection of SafeMath Underflow
  
```ts
npx hardhat test

  Counter
    Deployment Counter
      ✔ Should increment storage data in contract Counter (1424ms)
      ✔ Should decrement storage data in counter to 0 [ok] (95ms)
      ✔ Should decrement Reject Arithmetic Underflow  (47ms)

  FunctionIntro
    Deployment FunctionIntro
BigNumber { value: "10" }
      ✔ Should add a + b = c (167ms)
      ✔ Should sub Reject Arithmetic a - b = d (38ms)
      ✔ Should sub a - b = d [ok]

  Lock
    Deployment
      ✔ Should set the right unlockTime (166ms)
      ✔ Should set the right owner (48ms)
      ✔ Should receive and store the funds to lock
      ✔ Should fail if the unlockTime is not in the future (85ms)
    Withdrawals
      Validations
Unlock time is '1689450825' and block timestamp is '1657914827'
        ✔ Should revert with the right error if called too soon (59ms)
Unlock time is '1689450825' and block timestamp is '1689450826'
        ✔ Should revert with the right error if called from another account (75ms)
Unlock time is '1689450825' and block timestamp is '1689450826'
        ✔ Shouldn't fail if the unlockTime has arrived and the owner calls it (80ms)
      Events
Unlock time is '1689450825' and block timestamp is '1689450826'
        ✔ Should emit an event on withdrawals (57ms)
      Transfers
Unlock time is '1689450825' and block timestamp is '1689450826'
        ✔ Should transfer the funds to the owner (70ms)

  SafeMath
    Deployment Safe Math
      ✔ Should check Underflow OK (140ms)
      ✔ Should NOT check or uncheck Underflow calculus error prone.

  VendingMachine
    Deployment VendingMachine
      ✔ Should Custom Error OK (132ms)

  18 passing (3s)
```


