// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const fs = require("fs")

async function main() {
    const path = `bsc_${hre.network.name}_addresses.json`
    let address = JSON.parse(fs.readFileSync(path))

    const Contract = await hre.ethers.getContractFactory("KingAnimalItem")
    const contract = await Contract.deploy()

    await contract.deployed()

    console.log("Item deployed to: ", contract.address)

    address.KAI = contract.address
    fs.writeFileSync(path, JSON.stringify(address, null, 4))
    console.log("Contract deployed to: ", contract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
