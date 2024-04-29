import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import StaffDashboardCopy from "./staffdashboardcopy";
import Navbar from "../../../components/navbar";

const StaffDasboardDrawerCopy = () => {
  const navigate = useNavigate();
  const [toggled, setToggle] = useState(false);


  const updateToggle = ()=>{
    setToggle(prev=>!prev)
  }
    return (
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          checked={toggled}
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Page content here */}
          <Navbar updateToggle={updateToggle}></Navbar>
          <StaffDashboardCopy className="m-6"/>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={updateToggle}
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <button
                onClick={() => {
                  navigate("/staff/dashboard");
                }}
                className="btn btn-ghost"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => { navigate("/staff/users")}} className="btn btn-ghost">
                Customers
              </button>
            </li>
            <li>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/staff/orders");
                }}
                className="btn btn-ghost"
              >
                Orders
              </button>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    );
  
};

export default StaffDasboardDrawerCopy;