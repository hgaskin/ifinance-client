import axios from 'axios';
import React from 'react';

import StockPriceLive from "./StockPriceLive";

import "./CompanyData.scss";
import domain from '../../util/domain';

function CompanyData({companyData, getCompanyData, editCompanyDataFunction}) {
    

    // asynchronous function to call server (backend) and delete companyData.
    // axios delete request to server with pathname and database _id.
    // refresh function "getCompanyData" called from parent component "Home.js"
    async function deleteCompanyData() {
        if (window.confirm("Are you sure you want to remove from watchlist?")) {
            await axios.delete(`${domain}/stock_data/${companyData._id}`);

            getCompanyData();
        }
    }

    return (
        <div className="company-style">
            <StockPriceLive symbol={companyData.symbol}/>
            {companyData.company && <h1 className="company-name">{companyData.symbol}</h1>}
            {companyData.symbol && <h3 className="company-symbol">{companyData.company}</h3>}
            {companyData.sharesPurchased && <p className="company-price">Shares Purchased: {companyData.sharesPurchased}</p>}
            {companyData.priceAtPurchase && <p className="company-price">Price at Purchase: {companyData.priceAtPurchase}</p>}
            {companyData.description && <p className="company-description">Notes: {companyData.description}</p>}
            <button className="btn-edit" onClick={() => editCompanyDataFunction(companyData)}>Edit Company Data</button>
            <button className="btn-delete" onClick={deleteCompanyData}>Delete from Watchlist</button>
        </div>
    );
}

export default CompanyData;
