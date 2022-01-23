require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

const RINKEBY_URL = process.env.RINKEBY_URL;

const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1;
const PUBLIC_KEY_1 = process.env.PUBLIC_KEY_1;

const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;
const PUBLIC_KEY_2 = process.env.PUBLIC_KEY_2;

const PRIVATE_KEY_3 = process.env.PRIVATE_KEY_3;
const PUBLIC_KEY_3 = process.env.PUBLIC_KEY_3;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.6.0",
      }
    ]
  },
  namedAccounts: {
    attacker: {
      default: 0, // first account in signers list
      rinkeby: PUBLIC_KEY_1
    },
    user1: {
      default: 1, // second account in signers list
      rinkeby: PUBLIC_KEY_2
    },
    user2: {
      default: 2, // 3rd account in signers list
      rinkeby: PUBLIC_KEY_3
    },
  },
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
      [PRIVATE_KEY_1,PRIVATE_KEY_2,PRIVATE_KEY_3]
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
