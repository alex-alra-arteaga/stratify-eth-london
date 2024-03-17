async function fetchCPIAndDecideAllocation(API_KEY) {
    const THRESHOLD_BASIS_POINTS = 100;
    const baseUrl = "https://www.alphavantage.co/query";
    const functionType = "CPI";
    const interval = "monthly";
    const datatype = "json";
    const apiUrl = `${baseUrl}?function=${functionType}&interval=${interval}&datatype=${datatype}&apikey=${API_KEY}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        console.error("Error fetching CPI data or no response received.");
        return "error_fetching_data";
    }

    const data = await response.json();
    const cpiDataArray = data.data;
    const latestCpiValue = parseFloat(cpiDataArray[0].value);
    const lastYearCpiValue = parseFloat(
        cpiDataArray.find(entry =>
            entry.date.startsWith(cpiDataArray[0].date.substring(0, 4) - 1)
        ).value
    );

    const cpiChange = ((latestCpiValue - lastYearCpiValue) / lastYearCpiValue) * 100;
    const changeInBasisPoints = cpiChange * 100;

    if (changeInBasisPoints > THRESHOLD_BASIS_POINTS) {
        console.log('Significant increase in CPI detected, suggesting higher inflation. Consider increasing the gold allocation in the portfolio.');
        return "buy_btc";
    } else {
        console.log('CPI change is within the acceptable range. No significant inflation detected, consider maintaining or increasing USDC allocation.');
        return "hold_or_increase_usdc";
    }
}

// Example usage
const API_KEY = "Y63JH329THMGPRBZ"; // Use your actual API key here
fetchCPIAndDecideAllocation(API_KEY)
    .then(decision => console.log('Decision:', decision))
    .catch(error => console.error(error));
