import axios from "axios";
import React, {useState, useEffect} from "react";
import YahooDataBox from "./YahooDataBox";

function YahooAPI() {
    const [stockInfo, setStockInfo] = useState('gathering Company information...');
    const [stockMarketCap, setStockMarketCap] = useState('calculating Market Cap...');
    const [stockDailyPercentageChange, setStockDailyPercentageChange] = useState('calculating Daily % Change');

      useEffect( () => {
        getPercentageData();
    },[]);

      async function getPercentageData() {

        const options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
            params: {symbol: 'SCR', region: 'US'},
            headers: {
              'x-rapidapi-key': 'b8883bf430mshbe08577ae76c513p140593jsn58489ea57137',
              'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
          };

     await axios.request(options).then(function (response) {
          console.log(response.data.price);
          console.log("Market Cap: "+ response.data.price.marketCap.fmt);
          const apiStockInfo = response.data.price;
          const apiStockMarketCap = response.data.price.marketCap.fmt;
          const apiStockDailyPercentageChange = response.data.price.regularMarketChangePercent.fmt;

            //add info to update the state
            setStockInfo(apiStockInfo);
            setStockMarketCap(apiStockMarketCap);
            setStockDailyPercentageChange(apiStockDailyPercentageChange);

      }).catch(function (error) {
          console.error(error);
      })
    };

    return (
        <div>
            <p>Yahoo API</p>
                 
            <YahooDataBox 
                yahoo={stockInfo}
                marketcap={stockMarketCap}
                dailypercentage={stockDailyPercentageChange}
            />
            
        </div>
    )
}

export default YahooAPI;