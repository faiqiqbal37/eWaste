import React, { useState } from 'react';
import './forgotpassword.css';
import {Link} from "react-router-dom";
import axios from 'axios';


const Email = () => {


    const [user, setUser] = useState({
                                      email: "",})

    const [emailSent, setEmailSent] = useState(false);


    const handleEmail = async (e) => {
        e.preventDefault()
        let url = "http://127.0.0.1:5000/api/forgotPassword";
        await axios.post(url, user)

        // After the email has been sent, set the emailSent is true
        setEmailSent(true);

    };



    return (

        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Forgot your password</h1>
                        <p className="py-6">Ewaste</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Input your email, and the password will be sent to your mailbox!</span>

                                </label>
                                <input value={user.email}
                                       onChange={(e) => setUser({...user, email:e.target.value})} id="password" type="email"
                                       placeholder="email" className="input input-bordered" required/>
                                 {emailSent && <p className="text-red-500">The email has been sent!</p>}
                            </div>

                            <div className="form-control mt-6">

                                <button onClick={handleEmail} className="btn btn-primary">Send</button>
                                <p>
                                    Get your password? Wanna Login?{' '}
                                    <Link to="/login" className="link link-primary link-hover">Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Email;
