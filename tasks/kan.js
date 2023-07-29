const { task, types } = require("hardhat/config")
const { setMinter } = require("../utils")

const kanAbi = require("../artifacts/contracts/KingAnimalNFT.sol/KingAnimalNFT.json").abi

task("kan-set-minter", "Set minter for KAN").setAction(async (args, hre) => {
    const { KAN, Store } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const kan = new ethers.Contract(KAN, kanAbi, signer)

    await setMinter(kan, Store)

    console.log('done')
})
