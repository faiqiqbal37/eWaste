import CustomerNavbar from "../../components/customerNavbar";
import React, {useEffect, useState} from "react";
import {useStoreLogin} from "../../stores/store-login";
import {OrderTable} from "../customer-portal/ordertable/ordertable";
import {useNavigate} from "react-router-dom";



export const Orders = () => {

    let navigate = useNavigate();

    let baseUrl = "http://127.0.0.1:5000/api";


    const [orders, setOrders] = useState([]);


    const {loggedUser, updateLoggedUser} = useStoreLogin();

    let userID = loggedUser.user_id

    function countPendingOrders(){
        let pendingCount = 0;

// Iterate over the array of orders
        orders.forEach(order => {
            // Check if the status of the current order is "pending"
            if (order.status === 'Pending') {
                // If yes, increment the pendingCount
                pendingCount++;
            }
        });
        return pendingCount
    }

    useEffect(() => {
        // This code will be executed once when the component mounts

        async function fetchFilteredOrders(userID) {
            try {
                // Fetch orders data based on user_id from the backend API
                const ordersResponse = await fetch(`${baseUrl}/orders/user/${userID}`);
                if (!ordersResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const orders = await ordersResponse.json();

                // Fetch all devices from the backend API
                const devicesResponse = await fetch(`${baseUrl}/devices`);
                if (!devicesResponse.ok) {
                    throw new Error('Failed to fetch devices');
                }
                const devices = await devicesResponse.json();

                // Map all devices to their orders based on the device_id
                const filteredOrders = orders.map(order => {
                    const device = devices.find(device => device.device_id === order.device_id);
                    return {
                        device_name: device.device_name,
                        device_type: device.device_type,
                        classification: device.classification,
                        order_id: order.order_id,
                        date: order.date,
                        status: order.status,
                        price: device.price,
                        photos: device.photos,
                    };
                });
                console.log(orders)
                setOrders(filteredOrders)
                return filteredOrders;
            } catch (error) {
                console.error('Error fetching filtered orders:', error);
                return []; // Return an empty array or handle error as needed
            }
        }

        fetchFilteredOrders(userID).then(r => () => {console.log("done")})
        // Place your one-time initialization logic or any other code here
        console.log('Component mounted');

    }, []);








    return (
        <div className="p-4" >
            <div>
                <CustomerNavbar/>
            </div>
            <div>
                <div className="flex flex-row">
                    <div className="basis-1/3">
                        <select className="select select-bordered max-w-xs ">
                            <option disabled selected>Sort By</option>
                            <option>Date Added</option>
                            <option>Price (Ascending)</option>
                            <option>Price (Descending)</option>
                        </select>
                    </div>
                    <div className="basis-1/3">
                        <select className="select select-bordered max-w-xs basis-1/3">
                            <option disabled selected>Device Type</option>
                            <option>Tablet</option>
                            <option>Laptop</option>
                            <option>Smartphone</option>
                            <option>Smartwatch</option>
                        </select>
                    </div>
                    <div className="basis-1/3">
                        <select className="select select-bordered max-w-xs basis-1/3">
                            <option disabled selected>Category</option>
                            <option>Current</option>
                            <option>Rare</option>
                            <option>Recyclable</option>
                            <option>Unknown</option>
                        </select>
                    </div>
                    <div className="basis-1/3">
                        <button className="btn btn-outline btn-primary" onClick={() => {
                            navigate("/customer/placeorder")
                        }}>Place Order
                        </button>

                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div>
                <div>
                    <h1 className="items-center justify-center  text-2xl font-bold mb-4">Order Details</h1>
                    <OrderTable tableData={orders}
                                onClick={() => document.getElementById('my_modal_3').showModal()}
                                onClick1={() => {
                                    navigate("/customer/editorder")
                                }}/>
                </div>
            </div>
        </div>
)
}
