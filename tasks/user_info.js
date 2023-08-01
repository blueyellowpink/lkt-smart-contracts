const { task, types } = require("hardhat/config")
const { toUserInfo, parseLkt } = require("../utils")

const userInfoAbi = require("../artifacts/contracts/UserInfo.sol/UserInfo.json").abi

task("user-kan", "Get KANs").setAction(async (args, hre) => {
    const { UserInfo } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const userInfo = new ethers.Contract(UserInfo, userInfoAbi, signer)

    const nfts = await userInfo.getUserNft(await signer.getAddress())
    console.log(toUserInfo(nfts))

    console.log('done')
})

task("user-kai", "Get KAIs").setAction(async (args, hre) => {
    const { UserInfo } = require(`../bsc_${hre.network.name}_addresses.json`)
    const signer = await ethers.getSigner()
    const userInfo = new ethers.Contract(UserInfo, userInfoAbi, signer)

    const nfts = await userInfo.getUserItem(await signer.getAddress())
    console.log(toUserInfo(nfts))

    console.log('done')
})
