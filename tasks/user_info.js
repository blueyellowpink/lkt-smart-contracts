const { task, types } = require("hardhat/config")
const { unlimitedAllowance, parseLktArray, parseLkt } = require("../utils")

const marketplaceAbi = require("../artifacts/contracts/Marketplace.sol/Marketplace.json").abi
const kanAbi = require("../artifacts/contracts/KingAnimalNFT.sol/KingAnimalNFT.json").abi

task("user-kan", "Get KANs").setAction(async (args, hre) => {
    const { KAN } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const marketplace = new ethers.Contract(Marketplace, marketplaceAbi, signer)
    const kan = new ethers.Contract(KAN, kanAbi, signer)

    console.log('done')
})
