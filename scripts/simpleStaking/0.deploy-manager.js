const { ethers } = require("hardhat");

// const Web3EthAbi = require('web3-eth-abi');

const SeigManager_ABI = require("./abis/SeigManager.json");
const SeigManagerProxy_ABI = require("./abis/SeigManagerProxy.json");
const DepositManager_ABI = require("./abis/DepositManager.json");
const DepositManagerProxy_ABI = require("./abis/DepositManagerProxy.json");
const Candidate_ABI = require("./abis/Candidate.json");
const CandidateProxy_ABI = require("./abis/CandidateProxy.json");
const Layer2Registry_ABI = require("./abis/Layer2Registry.json");
const Layer2RegistryProxy_ABI = require("./abis/Layer2RegistryProxy.json");

async function DeployManager() {
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
    console.log('"SeigManagerProxy" upgradeTo SeigManager Done')


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
    console.log('"DepositManagerProxy" upgradeTo DepositManager Done')

    //==== Layer2Registry =================================

    const Layer2RegistryDeploy = await ethers.ContractFactory(
        Layer2Registry_ABI.abi,
        Layer2Registry_ABI.bytecode,
        deployer
    )

    const Layer2Registry = await Layer2RegistryDeploy.deploy();
    await Layer2Registry.deployed();
    console.log('deploying "Layer2Registry" at' , Layer2Registry.address)

    //==== Layer2RegistryProxy =================================

    const Layer2RegistryProxyDeploy = await ethers.ContractFactory(
        Layer2RegistryProxy_ABI.abi,
        Layer2RegistryProxy_ABI.bytecode,
        deployer
    )

    const Layer2RegistryProxy = await Layer2RegistryProxyDeploy.deploy();
    await Layer2RegistryProxy.deployed();
    console.log('deploying "Layer2RegistryProxy" at' , Layer2RegistryProxy.address)

    
    //==== upgradeTo =================================
    await (await Layer2RegistryProxy.upgradeTo(Layer2Registry.address)).wait()
    console.log('"Layer2RegistryProxy" upgradeTo Layer2Registry Done')


    //==== Candidate =================================

    const CandidateDeploy = await ethers.ContractFactory(
        Candidate_ABI.abi,
        Candidate_ABI.bytecode,
        deployer
    )

    const Candidate = await CandidateDeploy.deploy();
    await Candidate.deployed();
    console.log('deploying "Candidate" at' , Candidate.address)

    //==== CandidateProxy =================================

    const CandidateProxyDeploy = await ethers.ContractFactory(
        CandidateProxy_ABI.abi,
        CandidateProxy_ABI.bytecode,
        deployer
    )

    const CandidateProxy = await CandidateProxyDeploy.deploy();
    await CandidateProxy.deployed();
    console.log('deploying "CandidateProxy" at' , CandidateProxy.address)


    await (await CandidateProxy.upgradeTo(Candidate.address)).wait()
    console.log('"CandidateProxy" upgradeTo Candidate Done')

    //====== candidateFactory setAddress ==================
    await (await candidateFactory.connect(deploySigner).setAddress (
        DepositManagerProxy.address,
        v1Infos.daoCommitteeProxy,
        Candidate.address,
        v1Infos.ton,
        v1Infos.wton
     )).wait()

    //====== depositManagerV2 initialize ==================
    await (await depositManagerForMigration.connect(deploySigner).initialize(
        v1Infos.wton,
        layer2RegistryProxy.address,
        seigManagerProxy.address,
        v1Infos.globalWithdrawalDelay,
        DepositManager
    )).wait()
}

async function DeployDepositManager() {
    const [deployer] = await ethers.getSigners();
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
  await DeployManager()
//   await DeployDepositManager()
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
