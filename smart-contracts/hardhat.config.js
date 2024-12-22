require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
const { ALCHEMY_API_URL, METAMASK_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    }
  },
}

