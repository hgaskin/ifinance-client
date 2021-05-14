import axios from 'axios';
import React, { useState } from 'react';

import "./CompanyData.scss";

function StockPrice({symbol}) {
    const [companyCurrentPrice, setCompanyCurrentPrice] = useState(null);
    const [companyDayChange, setCompanyDayChange] = useState(null);
    const [companyDayChangePercent, setCompanyDayChangePercent] = useState(null);

    // asynchronous request to get stock PRICE from server
   async function getStockPrice() {
        // const API_KEY = "EFHRQZLWSBDE89TC";
        // const stockPRICE = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        // DEMO API ===> IBM //
        const stockPRICE = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`);       
        setCompanyCurrentPrice(stockPRICE.data["Global Quote"]["05. price"]);
        setCompanyDayChange(stockPRICE.data["Global Quote"]["09. change"]);
        setCompanyDayChangePercent(stockPRICE.data["Global Quote"]["10. change percent"]);
        
    }

     function getLiveData() {
         getStockPrice();
    }

    function stockDivColor() {
        if (companyDayChange > 0) {
            console.log(companyDayChange);
            return "green-price-div";

        } else if (companyDayChange < 0) {
            console.log(companyDayChange);
            return "red-price-div";
        } else {
            console.log(companyDayChange);
            return "white-price-div";
        }
    }
    
    return (
        <div className="company-LIVE">
            
                <h1>{(Math.round(companyCurrentPrice * 100) / 100).toFixed(2)}</h1>
            <div className={stockDivColor()}>
                <p>{(Math.round(companyDayChange * 100) / 100).toFixed(2)} ({companyDayChangePercent})</p>
            </div>
                <button className="btn-edit" onClick={getLiveData}>Fetch Live Data</button>
        </div>
    );
}

export default StockPrice;
