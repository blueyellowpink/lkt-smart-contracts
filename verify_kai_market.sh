#!/bin/sh

NETWORK=testnet
ARGS=arguments_kai_market_and_store.js
ADDRESS=0x58941312547793Ce80D5B57f3D52A1Bf1B51000d
CONTRACT=contracts/KaiMarketplace.sol:KaiMarketplace

yarn run hardhat verify --network $NETWORK --contract $CONTRACT --constructor-args ./verify/$ARGS $ADDRESS
