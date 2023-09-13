#!/bin/sh

NETWORK=testnet
ARGS=arguments_kai_market_and_store.js
ADDRESS=0x965C75b82652A411EDe5165cDdCA3e8113323A76
CONTRACT=contracts/KaiStore.sol:KaiStore

yarn run hardhat verify --network $NETWORK --contract $CONTRACT --constructor-args ./verify/$ARGS $ADDRESS
