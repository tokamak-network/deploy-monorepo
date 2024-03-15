const { ethers } = require("hardhat");
const { expect } = require("chai");

// const Web3EthAbi = require('web3-eth-abi');

const TON_ABI = require("../abis/TON.json");
const WTON_ABI = require("../abis/WTON.json");
const DAOVault_ABI = require("../abis/DAOVault.json");
const DAOAgendaManager_ABI = require("../abis/DAOAgendaManager.json");
const DAOCommittee_V1_ABI = require("../abis/DAOCommittee_V1.json");
const DAOCommitteProxy_ABI = require("../abis/DAOCommitteeProxy.json");
const SeigManager_ABI = require("../abis/SeigManager.json");
const SeigManagerProxy_ABI = require("../abis/SeigManagerProxy.json");
const DepositManager_ABI = require("../abis/DepositManager.json");
const DepositManagerProxy_ABI = require("../abis/DepositManagerProxy.json");
const Candidate_ABI = require("../abis/Candidate.json");
const CandidateFactory_ABI = require("../abis/CandidateFactory.json");
const CandidateFactoryProxy_ABI = require("../abis/CandidateFactoryProxy.json");
const Layer2Registry_ABI = require("../abis/Layer2Registry.json");
const Layer2RegistryProxy_ABI = require("../abis/Layer2RegistryProxy.json");
const PowerTONUpgrade_ABI = require("../abis/PowerTONUpgrade.json");
const PowerTONSwapperProxy_ABI = require("../abis/PowerTONSwapperProxy.json");
const RefactorCoinageSnapshot_ABI = require("../abis/RefactorCoinageSnapshot.json");
const CoinageFactory_ABI = require("../abis/CoinageFactory.json");

let network = "mainnet"

let networkAddress = require('./data/'+network+'.json');

describe('Staking & DAO Test', () => {
    let accounts;
    let deployer;
    let user1;
    let user2;

    let TONContract;
    let WTONContract;
    let DAOVaultContract;
    let DAOAgendaManagerContract;
    let CandidateFactoryContract;
    let CandidateFactoryProxyContract;
    let SeigManagerContract;
    let SeigManagerProxyContract;
    let DepositManagerContract;
    let DepositManagerProxyContract;
    let Layer2RegistryContract;
    let Layer2RegistryProxyContract;
    let RefactorCoinageSnapshotContract;
    let CoinageFactoryContract;
    let PowerTONContract;
    let PowerTONProxyContract;
    let DAOCommittee_V1Contract;
    let DAOCommitteeProxyContract;


    
    before('create signer', async () => {
        accounts = await ethers.getSigners();
        [deployer, user1, user2] = accounts;
        console.log("deployerAddr :", deployer.address)
        console.log("user1Addr :", user1.address)
        console.log("user2Addr :", user2.address)
        console.log(networkAddress)
    })

    describe('get the Contract', () => {
        it("get TON Contract", async () => {
            TONContract = await ethers.getContractAt(
                TON_ABI.abi,
                networkAddress.TON,
                deployer
            )
        })

        it("get WTON Contract", async () => {
            WTONContract = await ethers.getContractAt(
                WTON_ABI.abi,
                networkAddress.WTON,
                deployer
            )
        })

        it("get DAOVault Contract", async () => {
            DAOVaultContract = await ethers.getContractAt(
                DAOVault_ABI.abi,
                networkAddress.DAOVault,
                deployer
            )
        })

        it("get DAOAgendaManager Contract", async () => {
            DAOAgendaManagerContract = await ethers.getContractAt(
                DAOAgendaManager_ABI.abi,
                networkAddress.DAOAgendaManager,
                deployer
            )
        })

        it("get CandidateFactory Contract", async () => {
            CandidateFactoryContract = await ethers.getContractAt(
                CandidateFactory_ABI.abi,
                networkAddress.CandidateFactoryProxy,
                deployer
            )
        })

        it("get CandidateFactoryProxy Contract", async () => {
            CandidateFactoryProxyContract = await ethers.getContractAt(
                CandidateFactoryProxy_ABI.abi,
                networkAddress.CandidateFactoryProxy,
                deployer
            )
        })

        it("get SeigManager Contract", async () => {
            SeigManagerContract = await ethers.getContractAt(
                SeigManager_ABI.abi,
                networkAddress.SeigManagerProxy,
                deployer
            )
        })

        it("get SeigManagerProxy Contract", async () => {
            SeigManagerProxyContract = await ethers.getContractAt(
                SeigManagerProxy_ABI.abi,
                networkAddress.SeigManagerProxy,
                deployer
            )
        })
        
        it("get DepositManager Contract", async () => {
            DepositManagerContract = await ethers.getContractAt(
                DepositManager_ABI.abi,
                networkAddress.DepositManagerProxy,
                deployer
            )
        })
        
        it("get DepositManagerProxy Contract", async () => {
            DepositManagerProxyContract = await ethers.getContractAt(
                DepositManagerProxy_ABI.abi,
                networkAddress.DepositManagerProxy,
                deployer
            )
        })

        it("get Layer2Registry Contract", async () => {
            Layer2RegistryContract = await ethers.getContractAt(
                Layer2Registry_ABI.abi,
                networkAddress.Layer2RegistryProxy,
                deployer
            )
        })

        it("get Layer2RegistryProxy Contract", async () => {
            Layer2RegistryProxyContract = await ethers.getContractAt(
                Layer2RegistryProxy_ABI.abi,
                networkAddress.Layer2RegistryProxy,
                deployer
            )
        })

        it("get RefactorCoinageSnapshot Contract", async () => {
            RefactorCoinageSnapshotContract = await ethers.getContractAt(
                RefactorCoinageSnapshot_ABI.abi,
                networkAddress.RefactorCoinageSnapshot,
                deployer
            )
        })

        it("get CoinageFactory Contract", async () => {
            CoinageFactoryContract = await ethers.getContractAt(
                CoinageFactory_ABI.abi,
                networkAddress.CoinageFactory,
                deployer
            )
        })

        it("get PowerTON Contract", async () => {
            PowerTONContract = await ethers.getContractAt(
                PowerTONUpgrade_ABI.abi,
                networkAddress.PowerTONProxy,
                deployer
            )
        })

        it("get PowerTONProxy Contract", async () => {
            PowerTONProxyContract = await ethers.getContractAt(
                PowerTONSwapperProxy_ABI.abi,
                networkAddress.PowerTONProxy,
                deployer
            )
        })

        it("get DAOCommittee_V1 Contract", async () => {
            DAOCommittee_V1Contract = await ethers.getContractAt(
                DAOCommittee_V1_ABI.abi,
                networkAddress.DAOCommitteeProxy,
                deployer
            )
        })

        it("get DAOCommitteeProxy Contract", async () => {
            DAOCommitteeProxyContract = await ethers.getContractAt(
                DAOCommitteProxy_ABI.abi,
                networkAddress.DAOCommitteeProxy,
                deployer
            )
        })

        it("address check", async () => {
            console.log("TON: ",TONContract.address);
            console.log("WTON: ",WTONContract.address);
            console.log("DAOVault: ",DAOVaultContract.address);
            console.log("DAOAgendaManager: ",DAOAgendaManagerContract.address);
            console.log("CandidateFactory: ",CandidateFactoryContract.address);
            console.log("CandidateFactoryProxy: ",CandidateFactoryProxyContract.address);
            console.log("SeigManager: ", SeigManagerContract.address);
            console.log("SeigManagerProxy: ", SeigManagerProxyContract.address);
            console.log("DepositManager: ",DepositManagerContract.address);
            console.log("DepositManagerProxy: ",DepositManagerProxyContract.address);
            console.log("Layer2Registry: ", Layer2RegistryContract.address);
            console.log("Layer2RegistryProxy: ",Layer2RegistryProxyContract.address);
            console.log("RefactorCoinageSnapshot: ",RefactorCoinageSnapshotContract.address);
            console.log("CoinageFactory: ",CoinageFactoryContract.address);
            console.log("PowerTONUpgrade_ABI: ",PowerTONContract.address);
            console.log("PowerTONProxy: ",PowerTONProxyContract.address);
            console.log("DAOCommittee_V1: ",DAOCommittee_V1Contract.address);
            console.log("DAOCommitteeProxy: ", DAOCommitteeProxyContract.address);
        })
                
    })
})
