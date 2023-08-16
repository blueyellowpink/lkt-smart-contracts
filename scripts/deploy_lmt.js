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

    const Token = await hre.ethers.getContractFactory("Token")
    const params = {
        name: "LuxMartLoyaltyPoints",
        symbol: "LMT",
        amount: 120000000,
    }
    const token = await Token.deploy(params.name, params.symbol, params.amount)

    await token.deployed()

    address.LMT = token.address
    fs.writeFileSync(path, JSON.stringify(address, null, 4))
    console.log("Token deployed to: ", token.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
