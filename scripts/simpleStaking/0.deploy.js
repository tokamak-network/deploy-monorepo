const { ethers } = require("hardhat");

// const Web3EthAbi = require('web3-eth-abi');

const SeigManager_ABI = require("./abis/SeigManager.json");
const SeigManagerProxy_ABI = require("./abis/SeigManagerProxy.json");
const DepositManager_ABI = require("./abis/DepositManager.json");
const DepositManagerProxy_ABI = require("./abis/DepositManagerProxy.json");

async function DeploySeigManager() {
    const [deployer] = await ethers.getSigners();

    //==== SeigManager =================================

    const SeigManagerDeploy = await ethers.ContractFactory(
        SeigManager_ABI.abi,
        SeigManager_ABI.bytecode,
        deployer
    )

    const SeigManager = await SeigManagerDeploy.deploy();
    await SeigManager.deployed();
    console.log('deploying "SeigManager" at' , SeigManager.address)

    // const SeigManager = await ethers.getContractAt(ERC20_ABI.abi, lyda, deployer) 

    //==== SeigManagerProxy =================================

    const SeigManagerProxyDeploy = await ethers.ContractFactory(
        SeigManagerProxy_ABI.abi,
        SeigManagerProxy_ABI.bytecode,
        deployer
    )

    const SeigManagerProxy = await SeigManagerProxyDeploy.deploy();
    await SeigManagerProxy.deployed();
    console.log('deploying "SeigManagerProxy" at' , SeigManagerProxy.address)

    
    //==== upgradeTo =================================
    await (await SeigManagerProxy.upgradeTo(SeigManager.address)).wait()


}

async function DeployDepositManager() {
    //==== DepositManager =================================

    const DepositManagerDeploy = await ethers.ContractFactory(
        DepositManager_ABI.abi,
        DepositManager_ABI.bytecode,
        deployer
    )

    const DepositManager = await DepositManagerDeploy.deploy();
    await DepositManager.deployed();
    console.log('deploying "DepositManager" at' , DepositManager.address)

    //==== DepositManagerProxy =================================

    const DepositManagerProxyDeploy = await ethers.ContractFactory(
        DepositManagerProxy_ABI.abi,
        DepositManagerProxy_ABI.bytecode,
        deployer
    )

    const DepositManagerProxy = await DepositManagerProxyDeploy.deploy();
    await DepositManagerProxy.deployed();
    console.log('deploying "DepositManagerProxy" at' , DepositManagerProxy.address)


    await (await DepositManagerProxy.upgradeTo(DepositManager.address)).wait()

}

const main = async () => {
  await DeploySeigManager()
  await DeployDepositManager()
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
