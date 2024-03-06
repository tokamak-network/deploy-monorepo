import { ethers } from 'hardhat'

// const Web3EthAbi = require('web3-eth-abi');

const TON_ABI = require("../../abis/TON.json");
const WTON_ABI = require("../../abis/WTON.json");
const DAOVault_ABI = require("../../abis/DAOVault.json");
const DAOAgendaManager_ABI = require("../../abis/DAOAgendaManager.json");
const DAOCommittee_V1_ABI = require("../../abis/DAOCommittee_V1.json");
const DAOCommitteProxy_ABI = require("../../abis/DAOCommitteeProxy.json");
const SeigManager_ABI = require("../../abis/SeigManager.json");
const SeigManagerProxy_ABI = require("../../abis/SeigManagerProxy.json");
const DepositManager_ABI = require("../../abis/DepositManager.json");
const DepositManagerProxy_ABI = require("../../abis/DepositManagerProxy.json");
const Candidate_ABI = require("../../abis/Candidate.json");
const CandidateFactory_ABI = require("../../abis/CandidateFactory.json");
const CandidateFactoryProxy_ABI = require("../../abis/CandidateFactoryProxy.json");
const Layer2Registry_ABI = require("../../abis/Layer2Registry.json");
const Layer2RegistryProxy_ABI = require("../../abis/Layer2RegistryProxy.json");
const PowerTONUpgrade_ABI = require("../../abis/PowerTONUpgrade.json");
const PowerTONSwapperProxy_ABI = require("../../abis/PowerTONSwapperProxy.json");
const RefactorCoinageSnapshot_ABI = require("../../abis/RefactorCoinageSnapshot.json");
const CoinageFactory_ABI = require("../../abis/CoinageFactory.json");

async function DeployManager() {
    const [deployer] = await ethers.getSigners();

    let tosAddress = "0x409c4D8cd5d2924b9bc5509230d16a61289c8153"
    let uniswapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
    let uniswapRouter2Address = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45"

    let notuseAddress = "0x0000000000000000000000000000000000000001"

    const globalWithdrawalDelay  = ethers.BigNumber.from("93046")
    const lastSeigBlock = ethers.BigNumber.from("18169346");
    const seigManagerInfo = {
        minimumAmount: ethers.BigNumber.from("1000000000000000000000000000000"),
        powerTONSeigRate: ethers.BigNumber.from("100000000000000000000000000"),
        relativeSeigRate: ethers.BigNumber.from("400000000000000000000000000"),
        daoSeigRate: ethers.BigNumber.from("500000000000000000000000000"),
        seigPerBlock: ethers.BigNumber.from("3920000000000000000000000000"),
        adjustCommissionDelay:  ethers.BigNumber.from("93096"),
    }
    
    console.log("deployer : ", deployer.address)
    //==== TON =================================
    const TONDeploy = new ethers.ContractFactory(
        TON_ABI.abi,
        TON_ABI.bytecode,
        deployer
    )

    const TON = await TONDeploy.deploy();
    await TON.deployed();
    console.log('deploying "TON" at' , TON.address)

    //==== WTON =================================
    const WTONDeploy = new ethers.ContractFactory(
        WTON_ABI.abi,
        WTON_ABI.bytecode,
        deployer
    )

    const WTON = await WTONDeploy.deploy(TON.address);
    await WTON.deployed();
    console.log('deploying "WTON" at' , WTON.address)

    //==== DAOVault =================================
    const DAOVaultDeploy = new ethers.ContractFactory(
        DAOVault_ABI.abi,
        DAOVault_ABI.bytecode,
        deployer
    )

    const DAOVault = await DAOVaultDeploy.deploy(
        TON.address,
        WTON.address
    );
    await DAOVault.deployed();
    console.log('deploying "DAOVault" at' , DAOVault.address)

    //==== DAOAgendaManager =================================
    const DAOAgendaManagerDeploy = new ethers.ContractFactory(
        DAOAgendaManager_ABI.abi,
        DAOAgendaManager_ABI.bytecode,
        deployer
    )

    const DAOAgendaManager = await DAOAgendaManagerDeploy.deploy();
    await DAOAgendaManager.deployed();
    console.log('deploying "DAOAgendaManager" at' , DAOAgendaManager.address)

    //==== Candidate =================================

    const CandidateDeploy = new ethers.ContractFactory(
        Candidate_ABI.abi,
        Candidate_ABI.bytecode,
        deployer
    )

    const Candidate = await CandidateDeploy.deploy();
    await Candidate.deployed();
    console.log('deploying "Candidate" at' , Candidate.address)

    //==== CandidateFactory =================================

    const CandidateFactoryDeploy = new ethers.ContractFactory(
        CandidateFactory_ABI.abi,
        CandidateFactory_ABI.bytecode,
        deployer
    )

    const CandidateFactory = await CandidateFactoryDeploy.deploy();
    await CandidateFactory.deployed();
    console.log('deploying "CandidateFactory" at' , CandidateFactory.address)

    //==== CandidateFactoryProxy =================================

    const CandidateFactoryProxyDeploy = new ethers.ContractFactory(
        CandidateFactoryProxy_ABI.abi,
        CandidateFactoryProxy_ABI.bytecode,
        deployer
    )

    const CandidateFactoryProxy = await CandidateFactoryProxyDeploy.deploy();
    await CandidateFactoryProxy.deployed();
    console.log('deploying "CandidateFactoryProxy" at' , CandidateFactoryProxy.address)

    await (await CandidateFactoryProxy.upgradeTo(CandidateFactory.address)).wait()
    console.log('"CandidateFactoryProxy" upgradeTo CandidateFactory Done')

    const candidateFactory = (await ethers.getContractAt(CandidateFactory_ABI.abi, CandidateFactoryProxy.address, deployer))

    //==== SeigManager =================================

    const SeigManagerDeploy = new ethers.ContractFactory(
        SeigManager_ABI.abi,
        SeigManager_ABI.bytecode,
        deployer
    )

    const SeigManager = await SeigManagerDeploy.deploy();
    await SeigManager.deployed();
    console.log('deploying "SeigManager" at' , SeigManager.address)

    // const SeigManager = await ethers.getContractAt(ERC20_ABI.abi, lyda, deployer) 

    //==== SeigManagerProxy =================================

    const SeigManagerProxyDeploy = new ethers.ContractFactory(
        SeigManagerProxy_ABI.abi,
        SeigManagerProxy_ABI.bytecode,
        deployer
    )

    const SeigManagerProxy = await SeigManagerProxyDeploy.deploy();
    await SeigManagerProxy.deployed();
    console.log('deploying "SeigManagerProxy" at' , SeigManagerProxy.address)

    await (await SeigManagerProxy.upgradeTo(SeigManager.address)).wait()
    console.log('"SeigManagerProxy" upgradeTo SeigManager Done')

    const seigManagerV2 = (await ethers.getContractAt(SeigManager_ABI.abi, SeigManagerProxy.address, deployer))


    //==== DepositManager =================================

    const DepositManagerDeploy = new ethers.ContractFactory(
        DepositManager_ABI.abi,
        DepositManager_ABI.bytecode,
        deployer
    )

    const DepositManager = await DepositManagerDeploy.deploy();
    await DepositManager.deployed();
    console.log('deploying "DepositManager" at' , DepositManager.address)

    //==== DepositManagerProxy =================================

    const DepositManagerProxyDeploy = new ethers.ContractFactory(
        DepositManagerProxy_ABI.abi,
        DepositManagerProxy_ABI.bytecode,
        deployer
    )

    const DepositManagerProxy = await DepositManagerProxyDeploy.deploy();
    await DepositManagerProxy.deployed();
    console.log('deploying "DepositManagerProxy" at' , DepositManagerProxy.address)


    await (await DepositManagerProxy.upgradeTo(DepositManager.address)).wait()
    console.log('"DepositManagerProxy" upgradeTo DepositManager Done')

    const depositManagerV2 = (await ethers.getContractAt(DepositManager_ABI.abi, DepositManagerProxy.address, deployer))

    //==== Layer2Registry =================================

    const Layer2RegistryDeploy = new ethers.ContractFactory(
        Layer2Registry_ABI.abi,
        Layer2Registry_ABI.bytecode,
        deployer
    )

    const Layer2Registry = await Layer2RegistryDeploy.deploy();
    await Layer2Registry.deployed();
    console.log('deploying "Layer2Registry" at' , Layer2Registry.address)

    //==== Layer2RegistryProxy =================================

    const Layer2RegistryProxyDeploy = new ethers.ContractFactory(
        Layer2RegistryProxy_ABI.abi,
        Layer2RegistryProxy_ABI.bytecode,
        deployer
    )

    const Layer2RegistryProxy = await Layer2RegistryProxyDeploy.deploy();
    await Layer2RegistryProxy.deployed();
    console.log('deploying "Layer2RegistryProxy" at' , Layer2RegistryProxy.address)

    await (await Layer2RegistryProxy.upgradeTo(Layer2Registry.address)).wait()
    console.log('"Layer2RegistryProxy" upgradeTo Layer2Registry Done')

    const layer2RegistryV2 = (await ethers.getContractAt(Layer2Registry_ABI.abi, Layer2RegistryProxy.address, deployer))

    //==== RefactorCoinageSnapshot =================================
    const RefactorCoinageSnapshotDeploy = new ethers.ContractFactory(
        RefactorCoinageSnapshot_ABI.abi,
        RefactorCoinageSnapshot_ABI.bytecode,
        deployer
    )

    const RefactorCoinageSnapshot = await RefactorCoinageSnapshotDeploy.deploy();
    await RefactorCoinageSnapshot.deployed();
    console.log('deploying "RefactorCoinageSnapshot" at' , RefactorCoinageSnapshot.address)


    //==== CoinageFactory =================================
    const CoinageFactoryDeploy = new ethers.ContractFactory(
        CoinageFactory_ABI.abi,
        CoinageFactory_ABI.bytecode,
        deployer
    )

    const CoinageFactory = await CoinageFactoryDeploy.deploy();
    await CoinageFactory.deployed();
    console.log('deploying "CoinageFactory" at' , CoinageFactory.address)

    await (await CoinageFactory.setAutoCoinageLogic(RefactorCoinageSnapshot.address)).wait()
    console.log('"CoinageFactory" upgradeTo RefactorCoinageSnapshot Done')


    //==== PowerTON =================================
    const PowerTONDeploy = new ethers.ContractFactory(
        PowerTONUpgrade_ABI.abi,
        PowerTONUpgrade_ABI.bytecode,
        deployer
    )

    const PowerTON = await PowerTONDeploy.deploy();
    await PowerTON.deployed();
    console.log('deploying "PowerTON" at' , PowerTON.address)


    //==== PowerTONProxy =================================
    const PowerTONProxyDeploy = new ethers.ContractFactory(
        PowerTONSwapperProxy_ABI.abi,
        PowerTONSwapperProxy_ABI.bytecode,
        deployer
    )

    const PowerTONProxy = await PowerTONProxyDeploy.deploy(
        PowerTON.address,
        WTON.address,
        tosAddress,
        notuseAddress,
        notuseAddress,
        Layer2RegistryProxy.address,
        SeigManagerProxy.address
    );
    await PowerTONProxy.deployed();
    console.log('deploying "PowerTONProxy" at' , PowerTONProxy.address)

     //==== DAOCommittee =================================
     const DAOCommittee_V1Deploy = new ethers.ContractFactory(
        DAOCommittee_V1_ABI.abi,
        DAOCommittee_V1_ABI.bytecode,
        deployer
    )

    const DAOCommittee_V1 = await DAOCommittee_V1Deploy.deploy();
    await DAOCommittee_V1.deployed();
    console.log('deploying "DAOCommittee_V1" at' , DAOCommittee_V1.address)


    //==== DAOCommitteeProxy =================================
    const DAOCommitteeProxyDeploy = new ethers.ContractFactory(
        DAOCommitteProxy_ABI.abi,
        DAOCommitteProxy_ABI.bytecode,
        deployer
    )

    const DAOCommitteeProxy = await DAOCommitteeProxyDeploy.deploy(
        TON.address,
        DAOCommittee_V1.address,
        SeigManagerProxy.address,
        Layer2RegistryProxy.address,
        DAOAgendaManager.address,
        CandidateFactoryProxy.address,
        DAOVault.address
    );
    await DAOCommitteeProxy.deployed();
    console.log('deploying "DAOCommitteeProxy" at' , DAOCommitteeProxy.address)

    const daoCommittee = (await ethers.getContractAt(DAOCommittee_V1_ABI.abi, DAOCommitteeProxy.address, deployer))


    //=== TON, WTON Set =================================
    await WTON.setSeigManager(SeigManagerProxy.address);
    await WTON.addMinter(SeigManagerProxy.address);
    await TON.addMinter(WTON.address);


    await (await layer2RegistryV2.connect(deployer).addMinter(
        daoCommittee.address
    )).wait()

    await (await seigManagerV2.connect(deployer).addMinter(
        layer2RegistryV2.address
    )).wait()


    //====== candidateFactory setAddress ==================
    await (await candidateFactory.connect(deployer).setAddress (
        DepositManagerProxy.address,
        DAOCommitteeProxy.address,
        Candidate.address,
        TON.address,
        WTON.address
    )).wait()
    console.log('candidateFactory setAddress ')

    //====== depositManagerV2 initialize ==================
    await (await depositManagerV2.connect(deployer).initialize(
        WTON.address,
        Layer2RegistryProxy.address,
        SeigManagerProxy.address,
        globalWithdrawalDelay,
        DepositManager.address
    )).wait()
    console.log('depositManagerV2 initialized ')
    //마지막은 oldDepositManager 주소 값 (안쓰임-물어보기)

    //====== SeigManagerV2 Setting ==================
    await (await seigManagerV2.connect(deployer).initialize (
        TON.address,
        WTON.address,
        Layer2RegistryProxy.address,
        depositManagerV2.address,
        seigManagerInfo.seigPerBlock,
        CoinageFactory.address,
        lastSeigBlock
    )).wait()
    console.log('seigManagerV2 initialized ')
    
    await (await seigManagerV2.connect(deployer).setData (
        PowerTONProxy.address,
        DAOVault.address,
        seigManagerInfo.powerTONSeigRate,
        seigManagerInfo.daoSeigRate,
        seigManagerInfo.relativeSeigRate,
        seigManagerInfo.adjustCommissionDelay,
        seigManagerInfo.minimumAmount
    )).wait()
    console.log('seigManagerV2 setData ')
}

async function DeployDepositManager() {
    const [deployer] = await ethers.getSigners();
    //==== DepositManager =================================

    const DepositManagerDeploy = new ethers.ContractFactory(
        DepositManager_ABI.abi,
        DepositManager_ABI.bytecode,
        deployer
    )

    const DepositManager = await DepositManagerDeploy.deploy();
    await DepositManager.deployed();
    console.log('deploying "DepositManager" at' , DepositManager.address)

    //==== DepositManagerProxy =================================

    const DepositManagerProxyDeploy = new ethers.ContractFactory(
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
