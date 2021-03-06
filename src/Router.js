import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApiCall from './ApiCall';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Navbar from './navigation/Navbar';


// browserrouter links to other pages =========
function Router() {
    return (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/stocksearch">
                <ApiCall />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    </BrowserRouter>
    )
}

export default Router;
