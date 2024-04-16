import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Drawer} from "./drawer";
import {resetPersistenceStorage, useStoreLogin} from "../stores/store-login";
import { TiThMenu } from "react-icons/ti";


const Navbar = ({updateToggle}) => {
    const navigate = useNavigate();




    const {loggedUser, updateLoggedUser} = useStoreLogin();
    return (
        <div className="navbar bg-green-500 text-primary-content">
            <div className="flex-none">
                <TiThMenu onClick={updateToggle}></TiThMenu>
            </div>
            <div className="flex-1">
                <Link className="btn btn-link text-xl" to="/">eWaste</Link>
            </div>
            {loggedUser.user_id
                ? <div className="flex-none">
                    <button onClick={() => {
                        resetPersistenceStorage()
                        updateLoggedUser({})
                        navigate("/")
                    }} className="btn btn-link text-xl">
                        Logout
                    </button>
                </div>
                : null}
        </div>
    );
};

export default Navbar;
