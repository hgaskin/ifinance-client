import React from 'react';

function YahooDataBox({yahoo, marketcap, dailypercentage}) {

    return (
        <div>
            <h2>Company: {yahoo.longName}</h2>
            <h3>Symbol: {yahoo.symbol}</h3>
            <h4>Market Cap: {marketcap}</h4>
            <h4>Today: {dailypercentage}</h4>

        </div>
    )
}

export default YahooDataBox;