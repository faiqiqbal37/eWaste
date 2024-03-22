import React from 'react';
import {Link} from "react-router-dom";
import {StaffDrawer} from "./staffDrawer";
import {Drawer} from "./drawer";

const StaffNavbar = () => {

    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <StaffDrawer/>
            </div>
            <div className="flex-1">
                {<Link className="btn btn-ghost text-xl" to="/">eWaste</Link>}
            </div>
        </div>
    );
};

export default StaffNavbar;
