import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './login.css';
import Navbar from "../../components/navbar"; // Import CSS file for component styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // Here you can implement your login logic, for simplicity I'm just checking if both fields are filled
        if (email !== '' && password !== '') {
            setLoggedIn(true);
            // You can also redirect the user to another page after successful login
        } else {
            alert('Please fill in both username and password fields.');
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="email" value={email} className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={(e) => setPassword(e.target.value)} id="email" type="password" placeholder="password" className="input input-bordered" value={password} required/>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={handleLogin} className="btn btn-primary">Login</button>
                            <p>
                                Don't have an account?{' '}
                                <Link to="/registration">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div></div>
    );
};

export default Login;
