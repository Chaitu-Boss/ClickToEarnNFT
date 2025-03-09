require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // Add your Alchemy/Infura Sepolia RPC
      accounts: [process.env.PRIVATE_KEY], // Your Wallet Private Key
    },
  },
};
