import React from 'react';
import axios from 'axios';
import "./App.css";
import domain from './util/domain';


function StockDataBox({stockdata}) {

    // Company Data entry fields ==================
    const companyName = stockdata.Name;
    const companySymbol = stockdata.Symbol;
    const companyDescription = stockdata.Description;
    const companyPurchasePrice = 0;
    const companyShareCount = 1;

    //console.log(stockdata);

    //adds commas and dollar sign to Market Cap value //
    function numberWithCommas(x) {
        const numtodollars = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: 'USD'
        })
        return (numtodollars.format(x))
    }


//THE HOLY GRAIL FORMULA >>>>> ADDS one API data to my Server side Database !
    async function saveCompanyDataToPortolio(e) {
        e.preventDefault();

        alert("added " + stockdata.Name +" to watchlist.");

        const companyDataFormVersion_2 = {
            company: companyName ? companyName : undefined,
	        symbol: companySymbol ? companySymbol : undefined,
	        priceAtPurchase: companyPurchasePrice ? companyPurchasePrice : undefined,
	        sharesPurchased: companyShareCount ? companyShareCount : undefined,
	        description: companyDescription ? companyDescription : undefined,
        };
        
        await axios.post(`${domain}stock_data/`, companyDataFormVersion_2);
    }

    
    return ( 
       stockdata.Name ? 
       <div className="stock-main-div">
            <h2>Company: {stockdata.Name}</h2>
            <h3>Symbol: {stockdata.Symbol}</h3>
            <h3>Exchange: {stockdata.Exchange}</h3>
            <h3>Market Cap: {numberWithCommas(stockdata.MarketCapitalization)}</h3>
            <h3>Analyst Price Target: {stockdata.AnalystTargetPrice}</h3>

            
            
            

            <br/><button className="portfolio-button" type="button" name="portfolio" onClick={saveCompanyDataToPortolio}>Add {stockdata.Name} to Watchlist</button>
            <p>{stockdata.Description}</p>
        </div>
        : 
        <div>
            <h3>welcome to the company lookup page...</h3>
            <p>Due to the limited API we are only able to make calls to IBM.
            </p>
            <p>please begin by searching: "IBM"</p>
        </div>
    )
}

export default StockDataBox;