import { TiThMenu } from "react-icons/ti";
import {Link, useNavigate} from "react-router-dom";

export const CustomerDrawer = () => {
    const navigate = useNavigate();

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
                    <li>
                        <button
                          onClick={() => {navigate("/customer/customerdashboard")}}  className="btn btn-ghost">Dashboard
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-ghost" onClick={() => {navigate("/customer/orders")}}>Orders
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-ghost">Devices</button>
                    </li>
                    <li>
                        <button className="btn btn-ghost" onClick={() => {navigate("/customer/profile")}}>Profile</button>
                    </li>

                </ul>
            </div>
        </div>
    )
}
