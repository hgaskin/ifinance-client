import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formPasswordVerify, setFormPasswordVerify] = useState("");

// Register new account function .

    async function register(e) {
        e.preventDefault();

        const registerData = {
            email: formEmail,
            password: formPassword,
            passwordVerify: formPasswordVerify
        }

        await axios.post("http://localhost:5000/auth/", registerData);
    }

    return (
        <div className="auth-form">
            <h2>Register new account</h2>
            <form onSubmit={register}>
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

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
