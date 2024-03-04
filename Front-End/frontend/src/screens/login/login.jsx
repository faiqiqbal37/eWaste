import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './login.css'; // Import CSS file for component styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // Here you can implement your login logic, for simplicity I'm just checking if both fields are filled
        if (username !== '' && password !== '') {
            setLoggedIn(true);
            // You can also redirect the user to another page after successful login
        } else {
            alert('Please fill in both username and password fields.');
        }
    };

    return (
        <div className="login-container">
            <h1>eWaste</h1>
            <h2>Login Page</h2>
            {loggedIn ? (
                <p>You are logged in!</p>
            ) : (
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                    {/* Add a Link to the Registration page */}
                    <p>
                        Don't have an account?{' '}
                        <Link to="/registration">Register</Link>
                    </p>
                </form>
            )}
        </div>
    );
};

export default Login;
