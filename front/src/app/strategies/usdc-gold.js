// 10000 basis points = 100%
async function shouldRebalancePortfolio(apiKey, thresholdBasisPoints) {
    const baseUrl = 'https://www.alphavantage.co/query';
    const functionType = 'CPI';
    const interval = 'monthly';
    const datatype = 'json';
  
    // Construct the API URL
    const apiUrl = `${baseUrl}?function=${functionType}&interval=${interval}&datatype=${datatype}&apikey=${apiKey}`;
  
    try {

      const response = await fetch(apiUrl);
      const data = await response.json();
  

      const cpiDataArray = data.data;
  

      const latestCpiValue = parseFloat(cpiDataArray[0].value);
      const lastYearCpiValue = parseFloat(cpiDataArray.find(entry => entry.date.startsWith(cpiDataArray[0].date.substring(0, 4) - 1)).value);
  
      const cpiChange = ((latestCpiValue - lastYearCpiValue) / lastYearCpiValue) * 100;
  
      const changeInBasisPoints = cpiChange * 100;
  
      if (changeInBasisPoints > thresholdBasisPoints) {
        console.log('Significant increase in CPI detected, suggesting higher inflation. Consider increasing the gold allocation in the portfolio.');
        return 'buy_gold';
      } else {
        console.log('CPI change is within the acceptable range. No significant inflation detected, consider maintaining or increasing USDC allocation.');
        return 'hold_or_increase_usdc';
      }
    } catch (error) {
      console.error('Error fetching CPI data:', error);
      throw error;
    }
  }
  
  // Usage example:
  const API_KEY = "Y63JH329THMGPRBZ";
  const THRESHOLD_BASIS_POINTS = 100;
  
  shouldRebalancePortfolio(API_KEY, THRESHOLD_BASIS_POINTS)
    .then(action => console.log('Recommended Action:', action))
    .catch(error => console.error(error));
  