const ethers = require('ethers')
// const keccak256 = require('keccak256')
// const minterBytes32 = '0x' + keccak256('MINTER_ROLE').toString('hex')

// exports.formatEther = ( bigNumber ) => ethers.utils.formatEther(bigNumber)

// exports.parseEther = ( string ) => ethers.utils.parseEther(string)

exports.parseEtherArray = ( array ) => {
    // i should be number
    return array.map(i => ethers.utils.parseEther(i.toString()))
}
