import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CompanyData from './CompanyData';
import CompanyDataEditor from './CompanyDataEditor';

import "./Home.scss";


// page to show my portfolio of stocks
function Home() {
    const [companyData, setCompanyData] = useState([]);
    const [addCompanyDataOpen, setCompanyDataOpen] = useState(false);

    const [editCompanyData, setEditCompanyData] = useState(null);

    useEffect( () => {
        getCompanyData();
    }, []);

    // asynchronous request to get stock data from server
    async function getCompanyData() {
        const stockResponse = await axios.get("http://localhost:5000/stock_data/");
        console.log(stockResponse.data);
        setCompanyData(stockResponse.data);
    }


    // edit Company data request to update fields with companyData from database
    function editCompanyDataFunction(companyData) {
        setEditCompanyData(companyData);
        setCompanyDataOpen(true);

    }

    // .map() companyData for Portfolio JSON data 
    // pass in CompanyData component with props.
    function mapCompany() {
    //copy of companyData state using "sordedCompanyData = [...companyData]""
        let sortedCompanyData = [...companyData];
    //sort the data from most recent to oldest / top -> bottom of list
    //uses "createdAt" variable to sort
        sortedCompanyData = sortedCompanyData.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return sortedCompanyData.map((company, i) => {
            return (
            <CompanyData 
                key={i}
                companyData={company}
                getCompanyData={getCompanyData}
                editCompanyDataFunction={editCompanyDataFunction}  />
            );
        });
    }

// render code below >>>>
    return (
        <div className="home">
            Home Page
            <h1>My Portfolio / Watchlist</h1>
            {!addCompanyDataOpen && (
                <button className="btn-editor-toggle" onClick={() => setCompanyDataOpen(true)}>
                    Add New Company to Portfolio
                </button>
            )}
            {addCompanyDataOpen && (
                    <CompanyDataEditor 
                        setCompanyDataOpen={setCompanyDataOpen}
                        getCompanyData={getCompanyData}
                        editCompanyData={editCompanyData}
                    />
            )}
            
            
            {mapCompany()}
        </div>
    )
}

export default Home;
