import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorMessage from '../../navigation/ErrorMessage';
import domain from '../../util/domain';

import "./AuthForm.scss";

function Register() {
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formPasswordVerify, setFormPasswordVerify] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const {getUser} = useContext(UserContext);

    const history = useHistory();

// Register new account function .

    async function register(e) {
        e.preventDefault();

        const registerData = {
            email: formEmail,
            password: formPassword,
            passwordVerify: formPasswordVerify
        }

        try {
            await axios.post(`${domain}/auth/`, registerData);
        } catch (err) {
            if (err.response) {
                if (err.response.data.errorMessage) {
                    setErrorMessage(err.response.data.errorMessage);
                }
            }  
            return console.log({err});
        }

        await getUser();
        // useHistory hook to redirect to new page after register call
        history.push("/");
        
    }

    return (
        <div className="auth-form">
            <h2>Register new account</h2>
            {
                errorMessage && <ErrorMessage message={errorMessage} clear={() => setErrorMessage(null)}> </ErrorMessage>
            }
            <form className="form" onSubmit={register}>
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

                <label htmlFor="form-passwordVerify">Confirm Password</label>
                <input 
                    id="form-passwordVerify"
                    type="password"
                    value={formPasswordVerify}
                    onChange={(e) => setFormPasswordVerify(e.target.value)}
                />

                <button className="btn-submit" type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register;
