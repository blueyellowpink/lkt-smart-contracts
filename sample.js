import Web3Modal from "web3modal"
import { ethers } from "ethers"

const tokenAbi = require("./artifacts/contracts/Token.sol/Token.json").abi

const Networks = {
    BscTestnet: {
        ChainId: {
            decimal: 97,
            hex: "0x61",
        },
        RPCEndpoints: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
    BscMainnet: {
        ChainId: {
            decimal: 56,
            hex: "0x38",
        },
        RPCEndpoints: "https://bsc-dataseed.binance.org/",
    },
}

const web3Modal = new Web3Modal({
    network: Networks.RPCEndpoints,
    cacheProvider: true,
})
const connection = await web3Modal.connect()
const provider = new ethers.providers.Web3Provider(connection)

// get signer from metamask
const signer = provider.getSigner()
const signerAddress = await signer.getAddress()
setUserAddress(userAddress)

// create a contract
const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider)
