import React, { useState } from 'react';
import './registration.css';
import {register} from "../../services/authenticationservice";
import {Drawer} from "../../components/drawer";
import Navbar from "../../components/navbar";
import {Link} from "react-router-dom";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Implement registration logic here
        register(username, email, password).then(r => console.log(`${username} registered successfully!!!`))
    };

    return (

        // <div className="registration-container">
        //     <Navbar></Navbar>
        //     <h2>Registration</h2>
        //     <form>
        //         <label>
        //             Username:
        //             <input
        //                 type="text"
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //             />
        //         </label>
        //         <label>
        //             Email:
        //             <input
        //                 type="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //             />
        //         </label>
        //         <label>
        //             Password:
        //             <input
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //         </label>
        //         <button type="button" onClick={handleRegister}>
        //             Register
        //         </button>
        //     </form>
        // </div>

        <div>
            <Navbar/>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input value={username}
                                       onChange={(e) => setUsername(e.target.value)} id="name"
                                       placeholder="name" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input value={email}
                                       onChange={(e) => setEmail(e.target.value)} id="password" type="password"
                                       placeholder="password" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contact#: </span>
                                </label>
                                <input id="contact" type="number"
                                       placeholder="Contact Number" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input value={password}
                                       onChange={(e) => setPassword(e.target.value)} id="password" type="password"
                                       placeholder="password" className="input input-bordered" required/>
                            </div>


                            <div className="form-control mt-6">
                                <button onClick={handleRegister} className="btn btn-primary">Register</button>
                                <p>
                                    Wanna Login?{' '}
                                    <Link to="/login">Login</Link>
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
