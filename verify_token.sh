#!/bin/sh

NETWORK=testnet
ARGS=arguments_lkt.js
ADDRESS=0xfb4488AF459Ddd56CaBbC5F8544Fc2E3cb840d2A

yarn run hardhat verify --network $NETWORK --constructor-args ./verify/$ARGS --no-compile $ADDRESS
