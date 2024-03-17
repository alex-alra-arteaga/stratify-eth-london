async function main() {
  // 10000 basis points = 100%
  // test a consumer
  // initial 80% usdc, 20% btc
  const API_KEY = "Y63JH329THMGPRBZ";
  const THRESHOLD_BASIS_POINTS = 100;
  const baseUrl = "https://www.alphavantage.co/query";
  const functionType = "CPI";
  const interval = "monthly";
  const datatype = "json";

  // Construct the API URL
  const apiUrl =
    `${baseUrl}?function=${functionType}&interval=${interval}&datatype=${datatype}&apikey=${API_KEY}`;
  // Assuming Functions.makeHttpRequest is an async function that either returns a response or throws an error
  const response = await Functions.makeHttpRequest({
    url: apiUrl,
  });

  if (!response || response.error) {
    console.error("Error fetching CPI data or no response received.");
    // Handle the error scenario, maybe set an error state or return an error code/message
    return Functions.encodeString("error_fetching_data");
  }

  const data = await response.json();
  const cpiDataArray = data.data;

  const latestCpiValue = parseFloat(cpiDataArray[0].value);
  const lastYearCpiValue = parseFloat(
    cpiDataArray.find((entry) =>
      entry.date.startsWith(cpiDataArray[0].date.substring(0, 4) - 1)
    ).value,
  );

  const cpiChange = ((latestCpiValue - lastYearCpiValue) / lastYearCpiValue) *
    100;

  const changeInBasisPoints = cpiChange * 100;

  if (changeInBasisPoints > THRESHOLD_BASIS_POINTS) {
    console.log(
      "Significant increase in CPI detected, suggesting higher inflation. Consider increasing the gold allocation in the portfolio.",
    );
    return Functions.encodeString("buy_btc");
  } else {
    console.log(
      "CPI change is within the acceptable range. No significant inflation detected, consider maintaining or increasing USDC allocation.",
    );
    return Functions.encodeString("hold_or_increase_usdc");
  }
}

// Fix for ==> Error: Parsing error: 'return' outside of function. (21:4)
main();
