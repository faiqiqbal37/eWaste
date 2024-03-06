import React, { useState } from 'react';
import './registration.css';
import {register} from "../../services/authenticationservice";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Implement registration logic here
        register(username, email, password)
    };

    return (
        <div className="registration-container">
            <h2>Registration</h2>
            <form>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Registration;
