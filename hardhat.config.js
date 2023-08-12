
require("dotenv").config({ path: ".env" })
require("dotenv").config({ path: ".env.secret" })

// require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan");

require("./tasks")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.0",
            },
            // {
            //     version: '0.8.9',
            // },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            accounts: [process.env.TESTNET_PRIVATE_KEY],
        },
        mainnet: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            accounts: [
                process.env.MAINNET_PRIVATE_KEY ??
                    process.env.TESTNET_PRIVATE_KEY,
            ],
        },
    },
    etherscan: {
        apiKey: process.env.BSCSCAN_API_KEY,
    },
}
