async function fetchCPIAndDecideAllocation(API_KEY) {
    const THRESHOLD_BASIS_POINTS = 100;
    const baseUrl = "https://www.alphavantage.co/query";
    const functionType = "CPI";
    const interval = "monthly";
    const datatype = "json";
    const apiUrl = `${baseUrl}?function=${functionType}&interval=${interval}&datatype=${datatype}&apikey=${API_KEY}`;
    const response = await fetch(apiUrl);

    let isbtc = false;

    if (!response.ok) {
        console.error("Error fetching CPI data or no response received.");
        return "error_fetching_data";
    }

    const data = await response.json();
    const cpiDataArray = data.data;
    const latestCpiValue = parseFloat(cpiDataArray[0].value);
    const lastYearCpiValue = parseFloat(
        cpiDataArray.find((entry) =>
            entry.date.startsWith(cpiDataArray[0].date.substring(0, 4) - 1)
        ).value
    );

    const cpiChange =
        ((latestCpiValue - lastYearCpiValue) / lastYearCpiValue) * 100;
    const changeInBasisPoints = cpiChange * 100;

    // {
    //     "Pools": [
    //         {
    //             "poolAddress": "0xfb7a13a7a09facf66857c7b229b250a847fbcb59",
    //             "token0": "eETH",
    //             "token1": "WETH"
    //         }
    //     ],
    //     "Assets": [
    //         {
    //             "address": "0x0305ea0a4b43a12e3d130448e9b4711932231e83",
    //             "decimals": 18,
    //             "symbol": "eETH",
    //             "name": "EtherFi Ether"
    //         },
    //         {
    //             "address": "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
    //             "decimals": 18,
    //             "symbol": "WETH",
    //             "name": "Wrapped Ether"
    //         }
    //     ],
    //     "Amount": 1000000000000000000
    // }

    const pools = [
        (pool = {
            poolAddress: "0x2f5e87c9312fa29aed5c179e456625d79015299c",
            token0: "WBTC",
            token1: "WETH",
        }),

        (pool2 = {
            poolAddress: "0xc6962004f452be9203591991d15f6b388e09e8d0",
            token0: "WETH",
            token1: "USDC",
        }),
    ];

    const uni_res = fetch("http://localhost:3000/api/functions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pools,),
    });

    if (changeInBasisPoints > THRESHOLD_BASIS_POINTS) {
        console.log(
            "Significant increase in CPI detected, suggesting higher inflation. Consider increasing the gold allocation in the portfolio."
        );
        isbtc = true;
    } else {
        console.log(
            "CPI change is within the acceptable range. No significant inflation detected, consider maintaining or increasing USDC allocation."
        );
        isbtc = false;
    }
    if (isbtc) {
        
    }
}

// Example usage
const API_KEY = "Y63JH329THMGPRBZ"; // Use your actual API key here
fetchCPIAndDecideAllocation(API_KEY)
    .then((decision) => console.log("Decision:", decision))
    .catch((error) => console.error(error));
