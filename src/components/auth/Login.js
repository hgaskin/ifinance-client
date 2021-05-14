import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorMessage from '../../navigation/ErrorMessage';

import "./AuthForm.scss";

function Login() {
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const {getUser} = useContext(UserContext);

    const history = useHistory();

// Register new account function .

    async function login(e) {
        e.preventDefault();

        const loginData = {
            email: formEmail,
            password: formPassword,
        }

        try {
            await axios.post("http://localhost:5000/auth/login", loginData);
        } catch (err) {
            if (err.response) {
                if (err.response.data.errorMessage) {
                    setErrorMessage(err.response.data.errorMessage);
                }
            }
            return console.log({err});
        }


        await getUser();
        // useHistory hook to redirect to new page after login call
        history.push("/");
        
    }

    return (
        <div className="auth-form">
            <h2>Login</h2>
            {
                errorMessage && <ErrorMessage message={errorMessage} clear={() => setErrorMessage(null)}> </ErrorMessage>
            }
            <form className="form" onSubmit={login}>
                <label htmlFor="form-email">Email</label>
                <input 
                    id="form-email"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                />

                <label htmlFor="form-password">Password</label>
                <input 
                    id="form-password"
                    type="password"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                />

                <button className="btn-submit" type="submit">log in</button>
            </form>
            <p>Don't have an account? <Link to="/register">Regiser here.</Link></p>
        </div>
    )
}

export default Login;
