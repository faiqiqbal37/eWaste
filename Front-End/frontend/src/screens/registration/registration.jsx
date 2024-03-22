import React, { useState } from 'react';
import './registration.css';
import {register} from "../../services/authenticationservice";
import {Drawer} from "../../components/drawer";
import Navbar from "../../components/navbar";
import {Link} from "react-router-dom";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Registration = () => {


    const [user, setUser] = useState({name: "",
                                      email: "",
                                    contact: "",
                                    password: ""})

    const [successfulRegistration, setSuccessfulRegistration] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        let url = "http://127.0.0.1:5000/api/session/register";
        let res = await axios.post(url, user)
        let data = res.data
        if(Object.keys(data).length === 0){
            alert("Registration Failed")
        }
        else{
            setSuccessfulRegistration(true)
        }
    };

    if (successfulRegistration){
        return(
            <Navigate to="/login"></Navigate>
        )
    }

    return (

        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <p className="py-6">Ewaste</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input value={user.name}
                                       onChange={(e) => setUser({...user, name:e.target.value})} id="name"
                                       placeholder="name" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input value={user.email}
                                       onChange={(e) => setUser({...user, email:e.target.value})} id="password" type="email"
                                       placeholder="email" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contact Number </span>
                                </label>
                                <input value={user.contact} id="contact" type="tel"
                                       onChange={(e)=>setUser({...user, contact: e.target.value})}
                                       placeholder="Contact Number" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input value={user.password}
                                       onChange={(e) => setUser({...user, password:e.target.value})} id="password" type="password"
                                       placeholder="password" className="input input-bordered" required/>
                            </div>


                            <div className="form-control mt-6">
                                <button onClick={handleRegister} className="btn btn-primary">Register</button>
                                <p>
                                    Wanna Login?{' '}
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

export default Registration;
