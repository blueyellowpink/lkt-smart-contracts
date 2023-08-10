// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const fs = require("fs")
const { setMinter } = require("../utils")

const kanAbi = require("../artifacts/contracts/KingAnimalNFT.sol/KingAnimalNFT.json").abi

async function main() {
    const path = `bsc_${hre.network.name}_addresses.json`
    let address = JSON.parse(fs.readFileSync(path))

    // const Contract = await hre.ethers.getContractFactory("Store")
    // const params = {
    //     tokenAddress: address.LKT,
    //     kanAddress: address.KAN,
    // }
    // const contract = await Contract.deploy(
    //     params.tokenAddress,
    //     params.kanAddress
    // )
    //
    // await contract.deployed()
    //
    // address.Store = contract.address
    // fs.writeFileSync(path, JSON.stringify(address, null, 4))
    // console.log("Contract deployed to: ", contract.address)

    const KAN = new hre.ethers.Contract(address.KAN, kanAbi, await hre.ethers.getSigner())
    await setMinter(KAN, address.Store)
    console.log('KAN set Store as minter')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
