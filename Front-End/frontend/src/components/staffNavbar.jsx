import React from 'react';
import {Link} from "react-router-dom";
import {StaffDrawer} from "./staffDrawer";
import {Drawer} from "./drawer";
import {resetPersistenceStorage, useStoreLogin} from "../stores/store-login";


const StaffNavbar = () => {
    const {loggedUser, updateLoggedUser} = useStoreLogin();

    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <StaffDrawer/>
            </div>
            <div className="flex-1">
                {<Link className="btn btn-ghost text-xl" to="/">eWaste</Link>}
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

export default StaffNavbar;
