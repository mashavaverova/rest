/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-ignition-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://localhost:8545", 
    },
  },
};