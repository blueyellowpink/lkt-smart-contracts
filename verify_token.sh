#!/bin/sh

NETWORK=testnet
ARGS=arguments_lkt.js
ADDRESS=0xF051904AecB6A32Ce3d904aFA7BE20C7c8961D04

yarn run hardhat verify --network $NETWORK --constructor-args ./verify/$ARGS --no-compile $ADDRESS
