import { TiThMenu } from "react-icons/ti";
import {Link, useNavigate} from "react-router-dom";
import React from "react";

export const StaffDrawer = () => {
    return (


        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                {/* Page content here */}
                <TiThMenu/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><a href=''>Staff Members</a></li>
                    <li><a>User Information</a></li>
                    <li><a>Device Category</a></li>
                    <li><a>Payment Management</a></li>

                </ul>
            </div>
        </div>
    )

}
