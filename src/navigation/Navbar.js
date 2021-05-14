import React from 'react'
import { Link } from 'react-router-dom';

import "./Navbar.scss";

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/">
                <h1>Stock App Home</h1>
            </Link>
            <Link to="/login">
                Login 
            </Link>
            <Link to="/register">
                Register 
            </Link>
            <Link to="/stocksearch">
                search for stocks
            </Link>
        </div>
    )
}

export default Navbar;
