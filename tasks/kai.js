const { task, types } = require("hardhat/config")
const { setMinter } = require("../utils")

const kaiAbi = require("../artifacts/contracts/KingAnimalItem.sol/KingAnimalItem.json").abi

task("kai-set-minter", "Set minter for KAI").setAction(async (args, hre) => {
    const { KAI, KaiStore } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const kai = new ethers.Contract(KAI, kaiAbi, signer)

    await setMinter(kai, KaiStore)

    console.log('done')
})
