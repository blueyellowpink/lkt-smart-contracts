const ethers = require('ethers')
const keccak256 = require('keccak256')
const minterBytes32 = '0x' + keccak256('MINTER_ROLE').toString('hex')

exports.unlimitedAllowance =
    '115792089237316195423570985008687907853269984665640564039457584007913129639935'

exports.formatEther = ( bigNumber ) => ethers.utils.formatEther(bigNumber)
exports.parseEther = ( string ) => ethers.utils.parseEther(string)

exports.formatLkt = (string) => ethers.utils.formatUnits(string, 6)
exports.parseLkt = (string) => ethers.utils.parseUnits(string, 6)

exports.parseLktArray = ( array ) => {
    // i should be number
    return array.map(i => ethers.utils.parseUnits(i.toString(), 6))
}

exports.setMinter = async (contract, address) => {
    const set = await contract.grantRole(minterBytes32, address)
    await set.wait()
    return set
}

exports.toUserInfo = (items) => {
    if (items.length == 0) return []

    const tokenIds = items[0]
    const itemIds = items[1]
    const uris = items[2]

    const userInfos = []
    for (let i = 0; i < tokenIds.length; i++) {
        userInfos.push({
            tokenId: tokenIds[i],
            itemId: itemIds[i],
            uri: uris[i]
        })
    }

    return userInfos
}
