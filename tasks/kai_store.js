const { task, types } = require("hardhat/config")
const { unlimitedAllowance, parseLktArray, formatLkt } = require("../utils")

const storeAbi = require("../artifacts/contracts/KaiStore.sol/KaiStore.json").abi
const tokenAbi = require("../artifacts/contracts/Token.sol/Token.json").abi

task("kai-store-set-price", "Set price for NFT in store").setAction(async (args, hre) => {
    const { KaiStore } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const store = new ethers.Contract(KaiStore, storeAbi, signer)

    const prices = parseLktArray([8,10,12,14,16,18,8,10,12,14,16,18,8,10,12,14,16,18,20,22,24,26,30,36,20,22,24,26,30,36,20,22,24,26,30,36,25,30,35,40,48,58,25,30,35,40,48,58,25,30,35,40,48,58,25,30,35,40,48,58,25,30,35,40,48,58,25,30,35,40,48,58,40,50,55,60,68,78,45,50,55,60,68,78,45,50,55,60,68,78,45,50,55,60,68,78,45,50,55,60,68,78,45,50,55,60,68,78,70,75,80,85,90,100,70,75,80,85,90,100,70,75,80,85,90,100,70,75,80,85,90,100,70,75,80,85,90,100,70,75,80,85,90,100]);
    const itemIds = Array.from(Array(145).keys()).slice(1, 145) // 1..144

    const set = await store.setPrice(itemIds, prices)
    await set.wait()

    console.log('done')
})

task("kai-store-set-quant", "Set quantity for NFT in store").setAction(async (args, hre) => {
    const { KaiStore } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const store = new ethers.Contract(KaiStore, storeAbi, signer)

    const itemIds = Array.from(Array(145).keys()).slice(1, 145)
    const quantities = Array(144).fill(20)

    const set = await store.setQuantity(itemIds, quantities)
    await set.wait()

    console.log('done')
})

task("kai-store-get-price", "Get price for NFT in store").setAction(async (args, hre) => {
    const { KaiStore } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const store = new ethers.Contract(KaiStore, storeAbi, signer)

    const amount = await store.prices(1)
    console.log(formatLkt(amount))

    console.log('done')
})

task("kai-store-buy", "Buy NFT in store").setAction(async (args, hre) => {
    const { KaiStore, LKT } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const store = new ethers.Contract(KaiStore, storeAbi, signer)
    const token = new ethers.Contract(LKT, tokenAbi, signer)

    const allowance = await token.allowance(
        await token.signer.getAddress(),
        KaiStore
    )
    console.log(formatLkt(allowance))
    if (allowance.eq(ethers.BigNumber.from('0'))) {
        const approve = await token.approve(
            KaiStore,
            unlimitedAllowance
        )
        await approve.wait()
    }

    const buy = await store.buy(1, "test", 1)
    await buy.wait()

    console.log('done')
})
