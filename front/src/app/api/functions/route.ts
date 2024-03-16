import { NextResponse } from "next/server";
import { POOL_ABI, ERC20_ABI, VAULT_ABI } from "@/constants/contracts_abi";
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
// Path: front/src/app/api/functions/route.ts

type Request = {
    test: string;
};

// only uniswap part

export async function GET(request: Request) {
    let r_calldata = 0x0;
    // decide the return for the application -> should only be the calldata

    const runTask = async () => {
        const chainId = process.env.CHAIN_ID || 11155111; // localhost
        const privateKey = process.env.PRIVATE_KEY; // the one that will have access to call that function or anyone on the localchain
        if (!privateKey) throw new Error("PRIVATE_KEY not set");
        const wallet = new ethers.Wallet(privateKey);
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/"); // set json rpc provider -> alchemy
        const signer = wallet.connect(provider);
        const vaultAddress =
          process.env.MANAGER_VAULT_ADDRESS ||
          "0x2244F4ADE1eCE6C216C6B119c54725dEe34801B5";
        const usdcVaultAddress =
          process.env.USDC_VAULT_ADDRESS ||
          "0x941548baC4078BCE37E86241845A3cDe9794Ffdf";
        const eurcVaultAddress =
          process.env.EURC_VAULT_ADDRESS ||
          "0xE2A985f01b3116B7a0c7607d4d7DEA8e1C6534dB";
        const wethVaultAddress =
          process.env.WETH_VAULT_ADDRESS ||
          "0x23Eaa1E2c18E50D77e3e9C7C283d85f5C40e87db";
        const token1 =
          process.env.TOKEN1_ADDRESS ||
          "0x8D806A15ef18631A17E40EeD0EFf08b8Dd9b496B"; // weth
        const token2 =
          process.env.TOKEN2_ADDRESS ||
          "0x3d2e7C1b5626125B4FebbAE80fbed2f576131AFd"; // usdc
        const token3 =
          process.env.TOKEN3_ADDRESS||
          "0xD15DA458Caebf6f59B1ab2Dc6c78cF0b7ceFEBA0"; // eurc
        const poolAddress1 =
          process.env.POOL1_ADDRESS ||
          "0xc2DA49828cF4dA91aBb0F3bf062Cf1eb6215B6eF"; // weth/usdc
        const poolAddress2 =
          process.env.POOL2_ADDRESS ||
          "0x449eFEdEFEaABAeDb08Ecb54CCEcAF5B3321D0C6"; // eurc/usdc
        const slippageTolerance = new Percent(50, 10000); // defalut of uniswap -> 0.5% (increment if needed)
      
        try {
          // api fetch
          const { m2Latest, m2Previous } = await getM2MoneySupply();
      
          const m2LatestNum = parseFloat(m2Latest);
          const m2PreviousNum = parseFloat(m2Previous);
      
          const isEthForEuro: boolean = m2LatestNum < m2PreviousNum;
      
          // vault contract
          const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer);
          const WETH = new Token(Number(chainId), token1, 18, "WETH", "Wra ETH");
          const USDC = new Token(Number(chainId), token2, 6, "USDC", "USD Coin");
          const EURC = new Token(Number(chainId), token3, 6, "EURC", "EUR Coin");
      
          // init + fetch pool data 1
          const poolContract1 = new ethers.Contract(poolAddress1, POOL_ABI, signer);
          const liquidityPool1 = await poolContract1.liquidity();
          const poolData1 = await poolContract1.slot0();
      
          // init + fetch pool data 2
          const poolContract2 = new ethers.Contract(poolAddress2, POOL_ABI, signer);
          const liquidityPool2 = await poolContract2.liquidity();
          const poolData2 = await poolContract2.slot0();
          const Deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
      
          // create uniswap pool instance
          const pool1 = new Pool(
            WETH,
            USDC,
            FeeAmount.LOW,
            poolData1[0].toString(),
            liquidityPool1.toString(),
            Number(poolData1[1]),
            [
              {
                index: nearestUsableTick(
                  TickMath.MIN_TICK,
                  TICK_SPACINGS[FeeAmount.LOW]
                ),
                liquidityNet: liquidityPool1.toString(),
                liquidityGross: liquidityPool1.toString(),
              },
              {
                index: nearestUsableTick(
                  TickMath.MAX_TICK,
                  TICK_SPACINGS[FeeAmount.LOW]
                ),
                liquidityNet: (BigInt(liquidityPool1) * BigInt(-1)).toString(),
                liquidityGross: liquidityPool1.toString(),
              },
            ]
          );
      
          const pool2 = new Pool(
            EURC,
            USDC,
            FeeAmount.LOW,
            poolData2[0].toString(),
            liquidityPool2.toString(),
            Number(poolData2[1]),
            [
              {
                index: nearestUsableTick(
                  TickMath.MIN_TICK,
                  TICK_SPACINGS[FeeAmount.LOW]
                ),
                liquidityNet: liquidityPool2.toString(),
                liquidityGross: liquidityPool2.toString(),
              },
              {
                index: nearestUsableTick(
                  TickMath.MAX_TICK,
                  TICK_SPACINGS[FeeAmount.LOW]
                ),
                liquidityNet: (BigInt(liquidityPool2) * BigInt(-1)).toString(),
                liquidityGross: liquidityPool2.toString(),
              },
            ]
          );
      
          const C_USDC = new ethers.Contract(USDC.address, ERC20_ABI, signer);
      
          const C_EURC = new ethers.Contract(EURC.address, ERC20_ABI, signer);
      
          const balanceToken1: number = Number(await C_USDC.balanceOf(usdcVaultAddress));
          const balanceToken3: number = Number(await C_EURC.balanceOf(eurcVaultAddress));
          
          console.log(balanceToken1)
          console.log(balanceToken3)
      
          const percentageChangeInM2 =
            ((m2LatestNum - m2PreviousNum) / m2PreviousNum) * 100;
      
          const maxInvestmentPercent = 10; // e.g., up to 10% max invst (can be changed)
      
          const investmentPercent = Math.min(
            Math.abs(percentageChangeInM2),
            maxInvestmentPercent
          );
          
          let amountIn;
          if (isEthForEuro) {
            // If M2 decreased, swap eth for euro
            amountIn = (balanceToken1 * investmentPercent) / 100;
          } else {
            // If M2 increased, swap euro for eth
            amountIn = (balanceToken3 * investmentPercent) / 100;
          }
      
          console.log("amountIn", amountIn)
      
          // parse the amoutn in
          const parsed_amountIn = CurrencyAmount.fromRawAmount(WETH, amountIn.toFixed(0));
          if (!amountIn) {
            throw new Error("Amount in is not defined, please check the code");
          }
      
          let route;
          // this negation may be wrong
          if (!isEthForEuro) {
            route = new V3Route([pool1, pool2], WETH, EURC);
          } else {
            route = new V3Route([pool2, pool1], EURC, WETH);
          }
      
          const trade = await V3TradeSDK.fromRoute(
            route,
            parsed_amountIn,
            TradeType.EXACT_INPUT
          );
      
          // TODO -> check if this okay the form router sdk
          const routerTrade = new UniswapTrade(
            new RouterTrade({
              v2Routes: [],
              v3Routes: [
                {
                  routev3: trade.swaps[0].route,
                  inputAmount: trade.inputAmount,
                  outputAmount: trade.minimumAmountOut(new Percent(50, 10000)),
                },
              ],
              mixedRoutes: [],
              tradeType: TradeType.EXACT_INPUT,
            }),
            { slippageTolerance, recipient: vaultAddress }
          );
      
          const { calldata, value } = SwapRouter.swapCallParameters(routerTrade);
      
          const inter = new ethers.Interface(VAULT_ABI);
      
          const additionalCalldata = inter.encodeFunctionData(
            "fulfillRequest",
            [calldata, Deadline, isEthForEuro ? [WETH.address] : [USDC.address], amountIn.toFixed(0)] // token 1 is eth (weth) // token 2 is euro (eurc)
          );
      
          const tx = await signer.sendTransaction({
            data: additionalCalldata,
            to: vaultAddress,
            value: value,
            from: signer.address,
          });
      
          const recipient = await tx.wait();
          if (recipient?.status === 1) {
            console.log("Transaction successful");
          } else {
            console.log("Transaction failed");
            throw new Error(
              `Transaction failed to: ${recipient?.to} with calldata: ${calldata}`
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    return NextResponse.json({ calldata: r_calldata }, { status: 200 });
}
