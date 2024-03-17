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
import { VAULT_ABI, M_VAULT_ADDRESS, safeAbi } from "@/constants/contracts_abi";

type Body = {
    Assets: number[];
    recipient: string;
    owner: string;
};

const safeContractAddress = "gno:0xa987F6faB452006b95bf1b3451b09D71506EFE8d"; // Replace with the actual Safe contract address

export async function POST(request: any) {
    const res: Body = await request.json();
    const privateKey = process.env.PRIVATE_KEY || "";
    const chainId = 100;
    const wallet = new ethers.Wallet(privateKey);
    const provider = new ethers.JsonRpcProvider(
        "https://sepolia.drpc.org" // ! change this to gnosis testnet
    );
    const signer = wallet.connect(provider);

    const creteUnsignedVaultDeposittx = (
        receiver: string,
        assets: number[],
        owner: string
    ) => {
        const data = encodeFunctionData({
            abi: VAULT_ABI,
            functionName: "deposit",
            args: [assets, receiver, owner],
        });
        return data;
    };

    // Make a transaction against execTransactionFromModule
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
    // Make a transaction against executeNextTx
    // execute the tx
    const value = ethers.parseEther("0");
    const unsignedTx = creteUnsignedVaultDeposittx(
        res.recipient,
        res.Assets,
        res.owner
    );
    await execTransactionFromModule(M_VAULT_ADDRESS, value, unsignedTx, 0);
    // Wait for 3 minutes (180,000 milliseconds) // delay module -> need to make the tranaction...
    await new Promise((resolve) => setTimeout(resolve, 180000));

    // Make a transaction against executeNextTx
    await executeNextTx(M_VAULT_ADDRESS, value, unsignedTx, 0);

    return NextResponse.json(
        { reciever: res.recipient, assets: res.Assets, owner: res.owner },
        { status: 200 }
    );
}
