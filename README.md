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



