# LKT

## Requirements

-   Node v16.16.0

## Install deps

```bash
yarn
```

## Deploy contracts to BSC Testnet

-   Deploy LKT

```bash
yarn run hardhat run scripts/deploy_lkt.js --network testnet
```

-   Deploy LMT

```bash
yarn run hardhat run scripts/deploy_lmt.js --network testnet
```

## Deploy contracts to BSC Mainnet

-   Deploy LKT

```bash
yarn run hardhat run scripts/deploy_lkt.js --network mainnet
```

-   Deploy LMT

```bash
yarn run hardhat run scripts/deploy_lmt.js --network mainnet
```

## Deploy order
1. LKT, LMT
2. KAI, KAN
3. UserInfo
4. Store, Marketplace, KaiStore, KaiMarketplace

## Verify contract
- Go to `https://bscscan.com/`, create an account and create a new API Key
- Replace the `BSCSCAN_API_KEY` in `.env` file with the new API key
- Check and run `verify_token.sh` file
```bash
./verify_token.sh
```
