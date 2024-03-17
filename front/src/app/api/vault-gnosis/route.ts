import { ethers } from "ethers";
import { useWriteContract, createConfig } from "wagmi";
import type { Config } from "wagmi";
import {
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    http,
    custom,
} from "viem";
import getProof from "viem/actions";
import { mainnet, sepolia, gnosis } from "viem/chains";
import { NextResponse } from "next/server";
import { VAULT_ABI, M_VAULT_ADDRESS, safeAbi, erc20Abi} from "../../../constants/contracts_abi";
type Body = {
    Assets: number[];
    recipient: string;
    owner: string;
};

// safe wallet address (gnosis)
const safeContractAddress = "0xa987F6faB452006b95bf1b3451b09D71506EFE8d"; // Replace with the actual Safe contract address

// need to change this to gnosis testnet -> need to have

