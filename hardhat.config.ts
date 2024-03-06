import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv" ;
// import "hardhat-deploy";

dotenv.config();

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      forking: {
        url: `${process.env.ETH_NODE_URI_MAINNET}`,
        // blockNumber: 18811511
        // url: `${process.env.ETH_NODE_URI_sepolia}`,
        // blockNumber:18229970
      },
      allowUnlimitedContractSize: false,
      // deploy: ['deploy-migration']
    },
    local: {
      url: `${process.env.ETH_NODE_URI_localhost}`,
      timeout: 800000,
      // accounts: [`${process.env.DEPLOYER}`],
      // deploy: ['deploy-migration']
    },
    mainnet: {
      url: `${process.env.ETH_NODE_URI_MAINNET}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      gasPrice: 50000000000,
      // deploy: ['deploy']
    },
    goerli: {
      url: `${process.env.ETH_NODE_URI_goerli}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 5,
      // deploy: ['deploy-seig-manager-v1']
    },
    titan: {
      url: `${process.env.ETH_NODE_URI_TITAN}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 55004,
      // gasPrice: 1000000,
      // deploy: ['deploy_l2_proxy']
    },
    titangoerli: {
      url: `${process.env.ETH_NODE_URI_TITAN_GOERLI}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 5050,
      gasPrice: 250000,
      // deploy: ['deploy_l2_proxy']
    },
    sepolia: {
      url: `${process.env.ETH_NODE_URI_sepolia}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      // deploy: ['deploy_l2_proxy']
    },
  },
  solidity: "0.8.17",
};

export default config;
