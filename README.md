# TDD *Onboarding* Solidity Typescript Hardhat Nextjs 

------
##### *weekly59: 20220715*
  - [DOING]: TDD *Onboarding* Solidity Typescript Hardhat Nextjs
  - *[TODO]: TDD Access Control <https://docs.openzeppelin.com/contracts/4.x/access-control>* 
  - *[TODO]: TDD Event https://docs.openzeppelin.com/learn/developing-smart-contracts* 
------

## TDD *Onboarding* Solidity Typescript Hardhat Nextjs

------
### step 1 - environment
- Environment Tools Version
  - Solidity 0.8.9
  - Nextjs 12.2.2
  - Hardhat 2.10.1

### step 1.1
- Create **Nextjs** App Typescript 
  - Starting point
  - Just the tools, 
  - Default as we can,
  - Fresh Power of Teams Frameworks ;) 
  - ( do Not clone boilerplate )
  - <https://nextjs.org/learn/basics/create-nextjs-app>
```
npx creat-next-app blog4 --typescript
```

-----
- Layout from weekly57 ( reference: **w3schools** )
  - hand written React, css, html
  - Simple menu hardcoded from <https://www.w3schools.com/howto/howto_css_sidenav_buttons.asp>
  - Simple paralax from <https://www.w3schools.com/howto/howto_css_parallax.asp>
```
cd blog4
mkdir components
cp ../../weekly57/blog3/components/* components/
cp ../../weekly57/blog3/styles/* styles/
cp ../../weekly57/blog3/public/* public/
```

-----
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

-----
### step 1.2
- Creating **Hardhat** environment 
  - By **hardhat team** <https://hardhat.org/>
  - <https://hardhat.org/tutorial/creating-a-new-hardhat-project>
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

-----
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

- References: 
  - <https://buildmedia.readthedocs.org/media/pdf/solidity/develop/solidity.pdf>
  - <https://docs.soliditylang.org/en/v0.8.14/control-structures.html#panic-via-assert-and-error-via-require>
  - <https://hardhat.org/hardhat-chai-matchers/docs/reference#.revertedwithpanic>


------
### step 2 - Start Solidity by TDD Typescript Hardhat 
------
- contracts/SafeMath.sol 0.8 strict math overflow
  - Reference: starting point <https://www.youtube.com/watch?v=xv9OmztShIw&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p> 
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
### step 2.2
- **Custom Error Solidity** and test with Hardhat
  - This is interesting 0.8 
  - **Naming Error Code** 
  - can **Share code many contracts**  
  - <https://docs.soliditylang.org/en/v0.8.14/contracts.html#errors-and-the-revert-statement>
  - <https://hardhat.org/hardhat-chai-matchers/docs/reference#.revertedwithcustomerror>
------
- contracts/VendingMachine.sol
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
- tests/VendingMachine.ts
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
### step 2.3
#### **TDD [ok,  rejected] function** SafeMath solidity 0.8 default 
------

- contracts/FunctionIntro.sol  
```ts
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
// import "hardhat/console.sol";
// function log( uint msg ){ // So we can have a function outside of Contract Instance, like.. tolling purpose reusable piece of soft ;)
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
------

------
### STEP 4 - **Solidity Modifier** TDD Typescript Hardhat
------
- Solidity Modifiers
  - Always check isolated code
  - When there is an error or problem, isolate the problem

- contracts/FunctionModifier.sol   
```tsx
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
```
- test/FunctionModifier.ts
```tsx
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";
import { expect } from "chai";
import { ethers } from "hardhat";
describe(`FunctionModifier`, () => {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const FunctionModifier = await ethers.getContractFactory("FunctionModifier");
    const functionModifier = await FunctionModifier.deploy();
    return { functionModifier, owner, otherAccount };
  }
  describe(`Deployment FunctionModifier`, () => {
    it(`Should increment`, async () => {
      const { functionModifier } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await functionModifier.count() ).to.be.equal(0);
      expect( await functionModifier.inc() ).to.be.not.reverted; // look where the await is ;)
      expect( await functionModifier.count() ).to.be.equal(1);
    });
    it(`Should decrement`, async () => {
      const { functionModifier } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await functionModifier.count() ).to.be.equal(0);
      expect( await functionModifier.inc() ).to.be.not.reverted; // look where the await is ;)
      expect( await functionModifier.count() ).to.be.equal(1);
      expect( await functionModifier.dec() ).to.be.not.reverted; // look where the await is ;)
      expect( await functionModifier.count() ).to.be.equal(0);
    });
    it(`Should Revert "Paused" - modifier `, async () => {
      const { functionModifier } = await loadFixture(deployFixture); // Give an instance 3 of the contract counter
      await functionModifier.setPaused(true);
      await expect( functionModifier.dec() ).to.be
      .revertedWith( "Paused" ); // look where the await is ;)
    });
    it(`Should Revert "x >= 100" - modifier `, async () => {
      const { functionModifier } = await loadFixture(deployFixture); // Give an instance 3 of the contract counter
      await expect( functionModifier.incBy(200) ).to.be
      .revertedWith( "x >= 100" ); // look where the await is ;)
    });
  });
});
```
- [ok] Result - TDD **modifier** catch rejection revert assert
```
npx hardhat test test/FunctionModifier.ts

  FunctionModifier
    Deployment FunctionModifier
      ✔ Should increment (1515ms)
      ✔ Should decrement (164ms)
      ✔ Should Revert "Paused" - modifier  (97ms)
      ✔ Should Revert "x >= 100" - modifier  (48ms)

  4 passing (2s)
```

------
### STEP 5 - **Solidity constructor()** TDD Typescript Hardhat
------
- Solidity constructor() methods in contracts
  - Let see some console.log() in solidity **Thanks Hardhat Team** 
  - <https://hardhat.org/tutorial/debugging-with-hardhat-network>
  - inspect contract with console.log ethereum
  - <https://docs.soliditylang.org/en/v0.8.13/introduction-to-smart-contracts.html>
  - <https://docs.soliditylang.org/en/v0.8.13/units-and-global-variables.html#special-variables-functions>
  - data and variables in the contract block ( now I want to see them ;)
```
Block and Transaction Properties
    blockhash(uint blockNumber) returns (bytes32): hash of the given block when blocknumber is one of the 256 most recent blocks; otherwise returns zero
    block.basefee (uint): current block’s base fee (EIP-3198 and EIP-1559)
    block.chainid (uint): current chain id
    block.coinbase (address payable): current block miner’s address
    block.difficulty (uint): current block difficulty
    block.gaslimit (uint): current block gaslimit
    block.number (uint): current block number
    block.timestamp (uint): current block timestamp as seconds since unix epoch
    gasleft() returns (uint256): remaining gas
    msg.data (bytes calldata): complete calldata
    msg.sender (address): sender of the message (current call)
    msg.sig (bytes4): first four bytes of the calldata (i.e. function identifier)
    msg.value (uint): number of wei sent with the message
    tx.gasprice (uint): gas price of the transaction
    tx.origin (address): sender of the transaction (full call chain)
```

- [error] ok I forget to add a parameter value to call the constructor( _ ) 
```
npx hardhat test test/Constructor
An unexpected error occurred:

test/Constructor.ts:12:43 - error TS2554: Expected 1-2 arguments, but got 0.

12     const constructor = await Constructor.deploy();
                                             ~~~~~~~~
  typechain-types/factories/Constructor__factory.ts:77:5
    77     _x: PromiseOrValue<BigNumberish>,
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    An argument for '_x' was not provided.
```

- [ok] first test Constructor solidity contract, hardhat tdd typescript console log
  - contracts/Constructor.sol
```tsx
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
  }
}
```
  - test/Constructor.ts
```tsx
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
const TEST_UINT_OK = 123;
describe(`Constructor`, () => {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Constructor = await ethers.getContractFactory("Constructor");
    const constructor = await Constructor.deploy(TEST_UINT_OK);
    return { constructor, owner, otherAccount };
  }
  describe(`Deployment Constructor`, () => {
    it(`Should call Constructor, and show some debug info as tutorial weekly59`, async () => {
      const { constructor } = await loadFixture(deployFixture); // Give one **Constructor** instance.
      expect( await constructor.x() ).to.be.equal(TEST_UINT_OK);
    });
  });
});
```
  - [ok] Result, First call test Constructor console log msg sender
```
npx hardhat test test/Constructor
  Constructor
    Deployment Constructor
msg.sender:  0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
      ✔ Should call Constructor, and show some debug info as tutorial weekly59 (1650ms)
  1 passing (2s)
```

  - contracts/Constructor.sol more log tx block msg
```tsx
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
    console.log("tx.origin:  %s", tx.origin);
    console.log("tx.gasprice:  %s", tx.gasprice);
    console.log("block.timestamp:  %s", block.timestamp);
    console.log("block.number:  %s", block.number);
    console.log("block.chainid:  %s", block.chainid);
  }
}
```
  - [ok] Result more Constructor.sol more log tx block msg
```
npx hardhat test test/Constructor
Compiled 1 Solidity file successfully
  Constructor
    Deployment Constructor
msg.sender:  0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
tx.origin:  0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
tx.gasprice:  1875000000
block.timestamp:  1658154619
block.number:  1
block.chainid:  31337
      ✔ Should call Constructor, and show some debug info as tutorial weekly59 (1839ms)
  1 passing (2s)
```


------
### STEP 5 - **Solidity state global error** TDD Typescript Hardhat
------

- contracts/Ownable.sol
```tsx
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
``` 
- test/Ownable.ts
```tsx
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
describe(`Ownable`, () => {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Ownable = await ethers.getContractFactory("Ownable");
    const ownable = await Ownable.deploy();
    return { ownable, owner, otherAccount };
  }
  describe(`Deployment Ownable`, () => {
    it(`Should owner call ok`, async () => {
      const { ownable } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await ownable.onlyOwnerCanCallThisFunction() ).ok;
    });
    it(`Should not owner call rejected`, async () => {
      const { ownable, otherAccount } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await ownable.setOwner(otherAccount.address) ).to.be.ok;      
      try{
        await ownable.onlyOwnerCanCallThisFunction();
        assert.fail();        
      }catch(err){
        assert.isOk;
      }
    });
    it(`Should not owner call ok`, async () => {
      const { ownable, otherAccount } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      expect( await ownable.setOwner(otherAccount.address) ).to.be.ok;
      await expect( ownable.anyOneCanCallThisFunction() ).to.be.ok;
    });
    it(`Should reject same owner not change ownership rejected`, async () => {
      const { ownable, owner ,otherAccount } = await loadFixture(deployFixture); // Give an instance 1 of the contract counter
      try{
        await ownable.setOwner(owner.getAddress());
        assert.fail();        
      }catch(err){
        assert.isOk;
      }
    });
  });
});
```
- [ok] Result Ownable
```
npx hardhat test test/Ownable
  Ownable
    Deployment Ownable
      ✔ Should owner call ok (1536ms)
      ✔ Should not owner call rejected (128ms)
      ✔ Should not owner call ok (48ms)
      ✔ Should reject same owner not change ownership rejected (80ms)
  4 passing (2s)
  ```


------
