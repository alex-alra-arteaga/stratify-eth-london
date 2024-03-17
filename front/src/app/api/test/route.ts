// create a gnosis pay
// -> front will have the first part of the script to send the first tx -> and maybe approve the second tx?
// make the script so they can deposit on our contract
//
// get top 5 yields tokens with pools with Eure
// fixes
// make it in the back to test

// create gnosis wallet with delay moduel
// demon on the page with docyumentation

// tx to add to the vault
// withdraw from the vault back to gnosis pay

// gno:0xf2D247B96880E37d0d23Dc582189Ad02FfA8AE9e

// endponint to deposti to our vault

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
import { erc20Abi } from "@/constants/contracts_abi";
import { NextResponse } from "next/server";

// ERC20 token contract address
// vautl address
const erc20ContractAddress = "0xAee8E96bED6c5445658447fdeE8EdD12A1fD79b4"; // Replace with the actual ERC20 token contract address

// Safe contract address and ABI
const safeContractAddress = "0xdEf259414e5458d1C0bCbEc11312C365334ae69e"; // Replace with the actual Safe contract address
const safeAbi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "enum Enum.Operation",
                name: "operation",
                type: "uint8",
            },
        ],
        name: "execTransactionFromModule",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "enum Enum.Operation",
                name: "operation",
                type: "uint8",
            },
        ],
        name: "executeNextTx",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

export async function GET() {
    // use ethers
    const privateKey = process.env.PRIVATE_KEY || "";
    const chainId = 100;
    const wallet = new ethers.Wallet(privateKey);
    const provider = new ethers.JsonRpcProvider(
        "https://sepolia.drpc.org"
    );
    const signer = wallet.connect(provider);

    const createUnsignedErc20Tx = () => {
        const data = encodeFunctionData({
            abi: erc20Abi,
            functionName: "name",
        });
        return data;
    };

    const execTransactionFromModule = async (
        to: string,
        value: ethers.BigNumberish,
        data: string,
        operation: number
    ) => {
        const tx = await signer.sendTransaction({
            to: safeContractAddress,
            data: encodeFunctionData({
                abi: safeAbi,
                functionName: "execTransactionFromModule",
                args: [to, value, data, operation],
            }),
        });
        console.log("Transaction hash:", tx);
    };

    const executeNextTx = async (
        to: string,
        value: ethers.BigNumberish,
        data: string,
        operation: number
    ) => {
        let tx = await signer.sendTransaction({
            to: safeContractAddress,
            data: encodeFunctionData({
                abi: safeAbi,
                functionName: "executeNextTx",
                args: [to, value, data, operation],
            }),
        });
        console.log("Transaction hash:", tx);
    };

    const value = 0;
    const unsignedTxData = createUnsignedErc20Tx();

    // Make a transaction against execTransactionFromModule
    await execTransactionFromModule(
        erc20ContractAddress,
        value,
        unsignedTxData,
        0
    );

    // Wait for 3 minutes (180,000 milliseconds) // delay module -> need to make the tranaction...
    //await new Promise((resolve) => setTimeout(resolve, 180000));
    await new Promise((resolve) => setTimeout(resolve, 180));

    // Make a transaction against executeNextTx
    await executeNextTx(erc20ContractAddress, value, unsignedTxData, 0);

    return NextResponse.json(
        { status: 200 , tx: "Transaction hash:" },
    );
}

