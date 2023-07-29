const { task, types } = require("hardhat/config")
const { parseEtherArray } = require("../utils")

const storeAbi = require("../artifacts/contracts/Store.sol/Store.json").abi

task("store-set-price", "Set price for NFT in store").setAction(async (args, hre) => {
    const { Store } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const store = new ethers.Contract(Store, storeAbi, signer)

    const prices = parseEtherArray([8,10,12,14,16,18,8,10,12,14,16,18,8,10,12,14,16,18,20,22,24,26,30,36,20,22,24,26,30,36,20,22,24,26,30,36,25,30,35,40,48,58,25,30,35,40,48,58,25,30,35,40,48,58,25,30,35,40,48,58,25,30,35,40,48,58,25,30,35,40,48,58,40,50,55,60,68,78,45,50,55,60,68,78,45,50,55,60,68,78,45,50,55,60,68,78,45,50,55,60,68,78,45,50,55,60,68,78,70,75,80,85,90,100,70,75,80,85,90,100,70,75,80,85,90,100,70,75,80,85,90,100,70,75,80,85,90,100,70,75,80,85,90,100]);
    const itemIds = Array.from(Array(145).keys()).slice(1, 145) // 1..144

    const set = await store.setPrice(itemIds, prices)
    await set.wait()

    console.log('done')
})

task("store-set-quant", "Set quantity for NFT in store").setAction(async (args, hre) => {
    const { Store } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const store = new ethers.Contract(Store, storeAbi, signer)

    const itemIds = Array.from(Array(145).keys()).slice(1, 145)
    const quantities = Array(144).fill(20)

    const set = await store.setQuantity(itemIds, quantities)
    await set.wait()

    console.log('done')
})
