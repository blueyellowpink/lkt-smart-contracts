#!/bin/sh

NETWORK=testnet
ARGS=arguments_lkt.js
ADDRESS=0x74B7ECea44fA802eBE3a6a1Cf312159578E7Dedc

yarn run hardhat verify --network $NETWORK --constructor-args ./verify/$ARGS --no-compile $ADDRESS
