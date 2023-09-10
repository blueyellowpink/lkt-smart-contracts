const { task, types } = require("hardhat/config")
const { unlimitedAllowance, parseLktArray, parseLkt } = require("../utils")

const marketplaceAbi = require("../artifacts/contracts/Marketplace.sol/Marketplace.json").abi
const kanAbi = require("../artifacts/contracts/KingAnimalNFT.sol/KingAnimalNFT.json").abi

task("kai-market-sell", "Sell NFT on marketplace").setAction(async (args, hre) => {
    const { Marketplace, KAN } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const marketplace = new ethers.Contract(Marketplace, marketplaceAbi, signer)
    const kan = new ethers.Contract(KAN, kanAbi, signer)

    const isApproved = await kan.isApprovedForAll(await signer.getAddress(), Marketplace)
    if (!isApproved) {
        const approvalTx = await kan.setApprovalForAll(Marketplace, true)
        await approvalTx.wait()
        console.log('KAN setApprovalForAll for Marketplace')
    }

    const tx = await marketplace.createSale(
        /*tokenId=*/1,
        /*price=*/parseLkt('4')
    )
    await tx.wait()

    console.log('done')
})
