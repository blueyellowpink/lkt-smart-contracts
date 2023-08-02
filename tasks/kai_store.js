const { task, types } = require("hardhat/config")
const { unlimitedAllowance, parseLktArray, formatLkt } = require("../utils")

const storeAbi = require("../artifacts/contracts/KaiStore.sol/KaiStore.json").abi
const tokenAbi = require("../artifacts/contracts/Token.sol/Token.json").abi

task("kai-store-set-price", "Set price for NFT in store").setAction(async (args, hre) => {
    const { KaiStore } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const store = new ethers.Contract(KaiStore, storeAbi, signer)

    const itemIds = Array.from(Array(21).keys()).slice(13, 21)
    const prices = parseLktArray(Array(8).fill(2))

    const set = await store.setPrice(itemIds, prices)
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

    const buy = await store.buy(
        /*num*/3,
        /*url*/"http://...",
        /*itemId*/13 // from 13 to 20
    )
    await buy.wait()

    console.log('done')
})
