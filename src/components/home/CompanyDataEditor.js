import React, { useEffect, useState } from 'react';
import axios from "axios";

import "./CompanyDataEditor.scss";
import domain from '../../util/domain';

function CompanyDataEditor({ getCompanyData, setCompanyDataOpen, editCompanyData }) {

// Company Data entry fields ==================
    const [companyName, setCompanyName] = useState("");
    const [companySymbol, setCompanySymbol] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [companyPurchasePrice, setCompanyPurchasePrice] = useState(0);
    const [companyShareCount, setCompanyShareCount] = useState(0);

    // if prop: editCompanyData is populated, populate the values of the editor input field
    // ? : used to check if "undefined" is the state for some fields, and replaces it with empty string "".
    useEffect(() => {
        if (editCompanyData) {
            setCompanyName(editCompanyData.company ? editCompanyData.company : "");
            setCompanySymbol(editCompanyData.symbol ? editCompanyData.symbol : "");          
            setCompanyPurchasePrice(editCompanyData.priceAtPurchase ? editCompanyData.priceAtPurchase : 0);
            setCompanyShareCount(editCompanyData.sharesPurchased ? editCompanyData.sharesPurchased : 0);
            setCompanyDescription(editCompanyData.description ? editCompanyData.description : "");
        }
    }, [editCompanyData]);

    //Form async request upon SUBMIT to save company data to personal portfolio ====== ///
    async function saveCompanyDataToPortolio(e) {
        e.preventDefault();

        const companyDataForm = {
            company: companyName ? companyName : undefined,
	        symbol: companySymbol ? companySymbol : undefined,
	        priceAtPurchase: companyPurchasePrice ? companyPurchasePrice : undefined,
	        sharesPurchased: companyShareCount ? companyShareCount : undefined,
	        description: companyDescription ? companyDescription : undefined,
        };
        
        if(!editCompanyData) {
            await axios.post(`${domain}/stock_data/`, companyDataForm);
        }
        else {
            await axios.put(`${domain}/stock_data/${editCompanyData._id}`, companyDataForm);
        }

        getCompanyData();
        closeEditor();
    }

        //Close Submit button Function
        function closeEditor() {
            setCompanyDataOpen(false);
            setCompanyName("");
            setCompanySymbol("");
            setCompanyPurchasePrice(0);
            setCompanyShareCount(0);
            setCompanyDescription("");
        }


    return (
        <div className="editor-style">
                <form className="form" onSubmit={saveCompanyDataToPortolio}>
                        <label htmlFor="company-name">Company Name: </label>
                        <input 
                            id="company-name"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />

                        <label htmlFor="company-symbol">Symbol: </label>
                        <input  
                            id="company-symbol"
                            type="text" 
                            value={companySymbol}
                            onChange={(e) => setCompanySymbol(e.target.value)}
                        />

                        <label htmlFor="company-description">Description: </label>
                        <textarea 
                            id="company-description"
                            type="text"
                            value={companyDescription}
                            onChange={(e) => setCompanyDescription(e.target.value)}
                        />

                        <label htmlFor="company-priceAtPurchased">Purchase Price: </label>
                        <input 
                            id="company-priceAtPurchased"
                            type="number"
                            value={companyPurchasePrice}
                            onChange={(e) => setCompanyPurchasePrice(e.target.value)}
                        />

                        <label htmlFor="company-sharesPurchased">Share Count: </label>
                        <input 
                            id="company-sharesPurchased"
                            type="number"
                            value={companyShareCount}
                            onChange={(e) => setCompanyShareCount(e.target.value)}
                        />
                        <button className="btn-save" type="submit">Update</button>
                        <button className="btn-cancel" type="button" onClick={closeEditor}>Close Editor</button>
                    </form>
                </div>

    )
}

export default CompanyDataEditor
