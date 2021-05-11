import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StockDataBox from './StockDataBox';
import "./App.css";


// ======== GET REQUEST to API call ======= //
function ApiCall() {
    const [stockMarketData, setStockMarketData] = useState('');
    const [stockSymbolSearch, setStockSymbolSearch] = useState('');
    const [stockSearchQuery, setStockSearchQuery] = useState('');

// useEffect error below, but I only want ApiCall to re render when [stockSymbolSearch] is updated. //

    useEffect( () => {
        getStockData();
    }, [stockSymbolSearch]);

    // handleChange takes the input search string and updates it to the new state in stockSearchQuery //
    function handleChange(event) {
        event.preventDefault();
        setStockSearchQuery(event.target.value);
        console.log(stockSearchQuery);
          };

    // handleSubmit then takes the handleChange update and updates stockSymbolSearch to the stockSearchQuery input //
    function handleSubmit(event) {
        if (stockSearchQuery.length > 1) {
            setStockSymbolSearch(stockSearchQuery);
        } 
             
        setStockSearchQuery('');
             
        event.preventDefault();
    };

    function getStockData() {

        //get stock data from API
        const StockSearch = stockSymbolSearch;
        const API_KEY = "EFHRQZLWSBDE89TC";
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${StockSearch}&apikey=${API_KEY}`;
        
       axios.get(`${url}`)
        .then((response) => {
            console.log(response);
            const apiStockData = response.data;

            //add info to update the state
            setStockMarketData(apiStockData);

        })

        .catch(error => console.error(`Error: ${error}`));
    }


    return (
        <div>
            <div className="header-title">
                <h1>Stock Portfolio App</h1>
            </div>
            <input
                className = "input-search" 
                type="text"
                placeholder="Ticker: "
                value={stockSearchQuery}
                onChange={handleChange}>
            </input>
            <button onClick={handleSubmit}>Search Company Data</button>
            <p>Symbol Search: {stockSymbolSearch}</p>
            
            <StockDataBox stockdata={stockMarketData}/>
        </div>
    )
}

export default ApiCall;

// Alpha advantage API => https://www.alphavantage.co/query?function=OVERVIEW&symbol=SCR&apikey=EFHRQZLWSBDE89TC
