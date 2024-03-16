import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
    POOL_ABI,
    ERC20_ABI,
    VAULT_ABI,
    M_VAULT_ADDRESS,
} from "@/constants/contracts_abi";
import {
    FeeAmount,
    nearestUsableTick,
    TICK_SPACINGS,
    TickMath,
    Trade as V3TradeSDK,
} from "@uniswap/v3-sdk";
import { ethers } from "ethers";
import { Pool, Route as V3Route } from "@uniswap/v3-sdk";
import { Trade as RouterTrade } from "@uniswap/router-sdk";
import { SwapRouter, UniswapTrade } from "@uniswap/universal-router-sdk";
import { CurrencyAmount, Percent, Token, TradeType } from "@uniswap/sdk-core";
import { env } from "process";
import { Contract } from "ethers";
// Path: front/src/app/api/functions/route.ts

// route = new V3Route([pool1, pool2], WETH, EURC);

type AssetType = {
    address: string;
    decimals: number;
    symbol: string;
    name: string;
};

type PoolDataInReq = {
    poolAddress: string;
    token0: string; // pass the symbol
    token1: string; // pass the sybol
};
// ! need to be compatilbe with V3 Route function of uniswap the crate a valid route
// ! pass this in the order of the trade -> do not need to pass maybe the address just the asset name (in the future maybe -> when we have more abstraction)
type Body = {
    Pools: PoolDataInReq[]; // pools to change that assats -> have the swap
    Assets: AssetType[]; // all the assets (manager vault do not change)
    Amount: number; // amount In -> will go from Asset 1 to -> Asset 2 (with possible iteretions in the middle)
};

// crate array of tokens
// then cratte the pools depending on that

export async function POST(request : any) {
    // handle the request
    const res : Body = await request.json();
    console.log("res body", res);


    const chainId = process.env.CHAIN_ID || 11155111; // localhost
    const privateKey = process.env.PRIVATE_KEY; // the one that will have access to call that function or anyone on the localchain
    if (!privateKey) throw new Error("PRIVATE_KEY not set");
    const wallet = new ethers.Wallet(privateKey);
    const provider = new ethers.JsonRpcProvider("https://rpc2.sepolia.org"); // set json rpc provider -> alchemy
    const signer = wallet.connect(provider);


    // -> get the % of token 1 and token 2 -> compare to previous

    const tokens: Token[] = res.Assets.map((asset) => {
        return new Token(
            Number(chainId),
            asset.address,
            asset.decimals,
            asset.symbol,
            asset.name
        );
    });

    const pools: Contract[] = res.Pools.map((pool) => {
        return new ethers.Contract(pool.poolAddress, POOL_ABI, signer);
    });

    console.log("PPOOOOOLLSSS", pools);

    // uniswap pools type
    const pools_uniwasp: Promise<Pool[]> = Promise.all(
        pools.map(async (pool, index) => {
            // now we are getting the type pool
            console.log("tokens", {tokens});
            const poolAddress = await pool.target; 
            console.log("poolAddress", poolAddress);
            const auxiliarPool = res.Pools.find((pool) => pool.poolAddress == poolAddress);
            console.log("auxiliarPool", auxiliarPool);
            const token0: Token | undefined = tokens.find(
                (token) => token.symbol === auxiliarPool?.token0
            );
            if (token0 == undefined) throw new Error("Token 0 not found");
            const token1: Token | undefined = tokens.find(
                (token) => token.symbol === auxiliarPool?.token1
            );
            if (token1 == undefined) throw new Error("Token 1 not found");
            const poolLiquidity = await pool.liquidity();

            const poolSlot0Data = await pool.slot0();

            console.log("poolSlot0Data", poolSlot0Data);

            return new Pool(
                token0,
                token1,
                FeeAmount.LOW,
                poolSlot0Data[0].toString(),
                poolLiquidity.toString(),
                Number(poolSlot0Data[1]),
                [
                    {
                        index: nearestUsableTick(
                            TickMath.MIN_TICK,
                            TICK_SPACINGS[FeeAmount.LOW]
                        ),
                        liquidityNet: (await pool.liquidity()).toString(),
                        liquidityGross: poolLiquidity.toString(),
                    },
                    {
                        index: nearestUsableTick(
                            TickMath.MAX_TICK,
                            TICK_SPACINGS[FeeAmount.LOW]
                        ),
                        liquidityNet: (poolLiquidity * BigInt(-1)).toString(),
                        liquidityGross: poolLiquidity.toString(),
                    },
                ]
            );
        })
    );

    console.log("pools_uniwasp",await  pools_uniwasp);

    const slippageTolerance = new Percent(50, 10000); // defalut of uniswap -> 0.5% (increment if needed)
    // amoutn in shold be always the tokens[0]
    const parsed_amount_in = CurrencyAmount.fromRawAmount(
        tokens[0],
        res.Amount.toFixed(0)
    );

    const route = new V3Route(
        await pools_uniwasp,
        tokens[0],
        tokens[tokens.length - 1]
    ); // create the route
    const trade = await V3TradeSDK.fromRoute(
        route,
        parsed_amount_in,
        TradeType.EXACT_INPUT
    );

    console.log("trade", trade);

    // trade in router
    const routerTrade = new UniswapTrade(
        new RouterTrade({
            v2Routes: [],
            v3Routes: [
                {
                    routev3: trade.swaps[0].route,
                    inputAmount: trade.inputAmount,
                    outputAmount: trade.minimumAmountOut(
                        new Percent(50, 10000)
                    ),
                },
            ],
            mixedRoutes: [],
            tradeType: TradeType.EXACT_INPUT,
        }),
        { slippageTolerance, recipient: M_VAULT_ADDRESS }
    );

    console.log("routerTrade", routerTrade);

    const { calldata, value } = SwapRouter.swapCallParameters(routerTrade);

    const inter = new ethers.Interface(VAULT_ABI);
    const Deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    console.log("calldata", calldata);

    // const additionalCalldata = inter.encodeFunctionData(
    //     "fulfillRequest",
    //     [calldata, Deadline, tokens[0].address, parsed_amount_in.toFixed(0)] // token 1 is eth (weth) // token 2 is euro (eurc)
    // );

    // const tx = await signer.sendTransaction({
    //     data: additionalCalldata,
    //     to: M_VAULT_ADDRESS,
    //     value: value,
    //     from: signer.address,
    // });

    // const recipient = await tx.wait();
    // if (recipient?.status === 1) {
    //     console.log("Transaction successful");
    // } else {
    //     console.log("Transaction failed");
    //     throw new Error(
    //         `Transaction failed to: ${recipient?.to} with calldata: ${calldata}`
    //     );
    // }

    return NextResponse.json({ calldata: calldata }, { status: 200 });
}
