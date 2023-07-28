const { task, types } = require('hardhat/config')

const tokenAbi = require('../artifacts/contracts/Token.sol/Token.json').abi

task('token', 'transfer').setAction(
    async (args, hre) => {
        const { LKT } = require(`../bsc_testnet_addresses.json.json`)

        const signer = await ethers.getSigner()

        const character = new ethers.Contract(
            LKT,
            tokenAbi,
            signer
        )

        // const address = '0xAe454040CEC4403aBe10C1f9BA7e92907616C7b2'
        // const tx = await setMinter(character, address)
        //
        // txUrl(hre.network.name, tx)
        // console.log('done')
    }
)
