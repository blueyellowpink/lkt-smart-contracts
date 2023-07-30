import Web3Modal from "web3modal"
import { ethers } from "ethers"

const unlimitedAllowance =
    '115792089237316195423570985008687907853269984665640564039457584007913129639935'

const tokenAbi = require("./artifacts/contracts/Token.sol/Token.json").abi
const storeAbi = require("./artifacts/contracts/Store.sol/Store.json").abi
const address = require("./bsc_testnet_addresses.json")

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
// const signerAddress = await signer.getAddress()

// create a contract
const tokenContract = new ethers.Contract(address.LKT, tokenAbi, signer)
const storeContract = new ethers.Contract(address.Store, storeAbi, signer)

const buyNFT = async () => {
    const allowance = await tokenContract.allowance(
        await tokenContract.signer.getAddress(),
        address.Store
    )
    if (allowance.eq(ethers.BigNumber.from('0'))) {
        const approve = await tokenContract.approve(
            address.Store,
            unlimitedAllowance
        )
        await approve.wait()
    }

    const bought = await storeContract.buy(
        /*quantity=*/1,
        /*uri=*/'https://...',
        /*itemId=*/1,
    )
    await bought.wait()
}
