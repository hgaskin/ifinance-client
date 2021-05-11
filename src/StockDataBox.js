import React from 'react';
import "./App.css";

function StockDataBox({stockdata}) {
    console.log(stockdata);

    //adds commas and dollar sign to Market Cap value //
    function numberWithCommas(x) {
        const numtodollars = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: 'USD'
        })
        return (numtodollars.format(x))
    }

    const handleSubmit = event => {
        console.log(event);
        if(event.target.name === "buy") {
        alert("Purchased 1 share of " + stockdata.Name +"!");
        } else if(event.target.name === "sell") {
        alert("Sold 1 share of " + stockdata.Name + "!");
        } else if (event.target.name === "portfolio") {
        alert("Added " + stockdata.Name + " to your portfolio!");
        }
             
        event.preventDefault();
    };

    return (
        <div>
            <h2>Company: {stockdata.Name}</h2>
            <h3>Symbol: {stockdata.Symbol}</h3>
            <h3>Exchange: {stockdata.Exchange}</h3>
            <h3>Market Cap: {numberWithCommas(stockdata.MarketCapitalization)}</h3>
            <button className="buy-button" type="button" name="buy" onClick={handleSubmit}>Buy {stockdata.Name}</button>
            <button className="sell-button" type="button" name="sell" onClick={handleSubmit}>Sell {stockdata.Name}</button>
            <br/><button className="portfolio-button" type="button" name="portfolio" onClick={handleSubmit}>Add {stockdata.Name} to Portfolio</button>
            <p>{stockdata.Description}</p>
        </div>
    )
}

export default StockDataBox;