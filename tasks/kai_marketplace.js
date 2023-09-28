const { task, types } = require("hardhat/config")
const { unlimitedAllowance, parseLktArray, parseLkt } = require("../utils")

const kaiMarketplaceAbi = require("../artifacts/contracts/KaiMarketplace.sol/KaiMarketplace.json").abi
const tokenAbi = require("../artifacts/contracts/Token.sol/Token.json").abi

// task("kai-market-sell", "Sell NFT on marketplace").setAction(async (args, hre) => {
//     const { KaiMarketplace, KAN } = require(`../bsc_${hre.network.name}_addresses.json`)
//     const signer = await ethers.getSigner()
//     const marketplace = new ethers.Contract(Marketplace, kaiMarketplaceAbi, signer)
//     const kan = new ethers.Contract(KAN, kanAbi, signer)
//
//     const isApproved = await kan.isApprovedForAll(await signer.getAddress(), Marketplace)
//     if (!isApproved) {
//         const approvalTx = await kan.setApprovalForAll(Marketplace, true)
//         await approvalTx.wait()
//         console.log('KAN setApprovalForAll for Marketplace')
//     }
//
//     const tx = await marketplace.createSale(
//         /*tokenId=*/1,
//         /*price=*/parseLkt('4')
//     )
//     await tx.wait()
//
//     console.log('done')
// })

task("kai-market-buy", "Buy NFT on KaiMarketplace").setAction(async (args, hre) => {
    const { KaiMarketplace, LKT } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const token = new ethers.Contract(LKT, tokenAbi, signer)
    const kaiMarketplace = new ethers.Contract(KaiMarketplace, kaiMarketplaceAbi, signer)

    const allowance = await token.allowance(
        await token.signer.getAddress(),
        KaiMarketplace
    )
    if (allowance.eq(ethers.BigNumber.from('0'))) {
        const approve = await token.approve(
            KaiMarketplace,
            unlimitedAllowance
        )
        await approve.wait()
    }

    const tx = await kaiMarketplace.purchaseSale(/*saleId=*/1)
    await tx.wait()

    console.log('done')
})
