/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle')
require("@nomiclabs/hardhat-ethers");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    kovan: {
      url: "https://kovan.infura.io/v3/61e4f78a7e1249f89f01def30db4c551",
      accounts: [
        ""
      ] 
    },
  }
  };