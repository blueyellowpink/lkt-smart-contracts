const { task, types } = require("hardhat/config")
const { parseLkt } = require("../utils")

const tokenAbi = require("../artifacts/contracts/Token.sol/Token.json").abi

task("token-transfer", "Transfer token").setAction(async (args, hre) => {
    const { LKT  } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const token = new ethers.Contract(LKT, tokenAbi, signer)

    const params = {
        amount: parseLkt('10'),
        address: '0x61e011cc5f4E7D17BF5949B33773dbC3A32CbFD8'
    }
    const tx = await token.transfer(params.address, params.amount)
    await tx.wait()

    console.log('done')
})
