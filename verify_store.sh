#!/bin/sh

NETWORK=testnet
ARGS=arguments_market_and_store.js
ADDRESS=0x4953B00C965eE52afA0fD2c6C5AAF074BDA496e3
CONTRACT=contracts/Store.sol:Store

yarn run hardhat verify --network $NETWORK --contract $CONTRACT --constructor-args ./verify/$ARGS $ADDRESS
