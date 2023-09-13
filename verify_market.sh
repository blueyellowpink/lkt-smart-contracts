#!/bin/sh

NETWORK=testnet
ARGS=arguments_market_and_store.js
ADDRESS=0xEed0e8994550fB0a79D38C805b558DCf916D50F4
CONTRACT=contracts/Marketplace.sol:Marketplace

yarn run hardhat verify --network $NETWORK --contract $CONTRACT --constructor-args ./verify/$ARGS $ADDRESS
