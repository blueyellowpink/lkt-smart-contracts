require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config({ path: ".env" });
require("dotenv").config({ path: ".env.secret" });

// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");


require("./tasks")


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        bsc_testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            gasPrice: 20000000000,
            accounts: [process.env.TESTNET_PRIVATE_KEY],
        },
        bsc_mainnet: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            gasPrice: 20000000000,
            accounts: [
                process.env.MAINNET_PRIVATE_KEY ?? process.env.TESTNET_PRIVATE_KEY,
            ],
        },
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: process.env.BSCSCAN_API_KEY,
    },
};
