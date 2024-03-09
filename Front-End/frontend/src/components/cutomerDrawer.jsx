import { TiThMenu } from "react-icons/ti";

export const CustomerDrawer = () => {
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
                    <li><a>Dashboard</a></li>
                    <li><a>Orders</a></li>
                    <li><a>Devices</a></li>
                    <li><a>Settings</a></li>

                </ul>
            </div>
        </div>
    )
}
