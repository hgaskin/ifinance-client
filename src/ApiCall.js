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
        event.preventDefault();

        if (stockSearchQuery.length > 0) {
            setStockSymbolSearch(stockSearchQuery);
        } 
             
        setStockSearchQuery('');
             
    };

    // ======== GET stock data Function from API ==========
    function getStockData() {

        const StockSearch = stockSymbolSearch;
        // const API_KEY = "EFHRQZLWSBDE89TC";
        // const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${StockSearch}&apikey=${API_KEY}`;
        // only works when StockSearch = "IBM";
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${StockSearch}&apikey=demo`;

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
                <h1>Company Database Search</h1>
            </div>
            <div className="search-input-div">
                <input
                    className = "input-search" 
                    type="text"
                    placeholder="Ticker: "
                    value={stockSearchQuery}
                    onChange={handleChange}>
                </input>
                <button onClick={handleSubmit}>Search</button>
            </div>
            
            <p>Symbol Search: {stockSymbolSearch}</p>
            <p>**API call frequency is 5 calls per minute and 500 calls per day.</p>
             
            {stockMarketData.Note ? 
                    <div class="alert">
                        
                        <strong>Exceeded API Call Limit!</strong> {stockMarketData.Information}
                    </div>
                : 
                    <div class="alert success">
                          
                        <strong>Success!</strong> API Call Working.
                    </div>
            } 
            <StockDataBox stockdata={stockMarketData}/>
        </div>
    )
}

export default ApiCall;

