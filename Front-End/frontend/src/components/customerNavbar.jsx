import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Drawer} from "./drawer";
import {CustomerDrawer} from "./cutomerDrawer";
import {resetPersistenceStorage, useStoreLogin} from "../stores/store-login";


const CustomerNavbar = () => {
    const navigate = useNavigate();
    const {loggedUser, updateLoggedUser} = useStoreLogin();


    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <CustomerDrawer/>
            </div>
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" to="/">eWaste</Link>
            </div>
            {loggedUser.user_id
                ? <div className="flex-none">
                    <button onClick={() => {
                        resetPersistenceStorage()
                        updateLoggedUser({})
                        navigate("/")
                    }
                    } className="btn btn-square btn-ghost">
                        Logout
                    </button>
                </div>
                : null}
        </div>
    );
};

export default CustomerNavbar;
