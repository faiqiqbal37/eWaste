import Navbar from "../../../components/navbar";
import CustomerNavbar from "../../../components/customerNavbar";
import {Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";

import * as PropTypes from "prop-types";
import {OrderTable} from "../ordertable/ordertable";
import { useStoreLogin } from "../../../stores/store-login"
import axios from "axios";


export const CustomerDashboard = () => {
    var state = "pending"
    var stateTwo = "completed"
    const navigate = useNavigate();

    let baseUrl = "http://127.0.0.1:5000/api";

    const [orders, setOrders] = useState([]);
    const [orderStats, setOrderStats] = useState([]);

    const {loggedUser, updateLoggedUser} = useStoreLogin();

    let userID = loggedUser.user_id

    function countPendingOrders(){
        let pendingCount = 0;

        // Iterate over the array of orders
        orderStats.forEach(order => {
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

        async function fetchStats(userID) {
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
                setOrderStats(filteredOrders)
                return filteredOrders;
            } catch (error) {
                console.error('Error fetching filtered orders:', error);
                return []; // Return an empty array or handle error as needed
            }
        }
        // This function fetches all the orders that are completed
        async function fetchAllOrders() {
            try {
                // Fetch orders data based on user_id from the backend API
                const ordersResponse = await fetch(`${baseUrl}/orders`);
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

                const usersResponse = await fetch(`${baseUrl}/users`);
                if (!usersResponse.ok) {
                    throw new Error('Failed to fetch devices');
                }
                const users = await usersResponse.json();

                // Map all devices to their orders based on the device_id
                const filteredOrders = orders
                    .filter(order => order.status === "Processed")
                    .map(order => {
                        const device = devices.find(device => device.device_id === order.device_id);
                        const user = users.find(user => user.user_id === order.user_id);
                        return {
                            name: user.name,
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

        fetchAllOrders().then(() => {"fetched all the orders"})
        fetchStats(userID).then(() => {"fetched all the order stats"})


        // fetchFilteredOrders(userID).then(r => () => {console.log("done")})
        // Place your one-time initialization logic or any other code here
        console.log('Component mounted');

    }, []);



    return (
        <div>
            {console.log(loggedUser)}
            <div>
                <CustomerNavbar/>
            </div>
            <div className="p-4">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Welcome {loggedUser.name}</h1>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Stat Box 1 */}
                        <div className="p-4 border rounded-md">
                            <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
                            <p className="text-gray-600">{orderStats.length}</p>
                        </div>

                        {/* Stat Box 2 */}
                        <div className="p-4 border rounded-md">
                            <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>
                            <p className="text-gray-600">{countPendingOrders()}</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="divider"></div>

            <div>
                <h1 className="text-2xl font-bold mb-4" style={{textAlign: "center"}}>Items Listed on eWaste</h1>
            </div>
            <div className="divider"></div>


            <div className="flex items-center justify-center h-full">
                {/* Container to center align the div */}
                <div className="p-4 flex flex-row items-center justify-between">
                    <div id="sort" className="mr-2 pr-10 justify-start">
                        <select className="select select-bordered max-w-xs">
                            <option disabled selected>Sort By</option>
                            <option>Date Added</option>
                            <option>Price (Ascending)</option>
                            <option>Price (Descending)</option>
                        </select>
                    </div>
                    <div id="type" className="mr-2 pr-10 ">
                        <select className="select select-bordered max-w-xs basis-1/3">
                            <option disabled selected>Device Type</option>
                            <option>Tablet</option>
                            <option>Laptop</option>
                            <option>Smartphone</option>
                            <option>Smartwatch</option>
                        </select>
                    </div>
                    <div id="category" className="mr-60 pr-100">
                        <select className="select select-bordered max-w-xs basis-1/3">
                            <option disabled selected>Category</option>
                            <option>Current</option>
                            <option>Rare</option>
                            <option>Recyclable</option>
                            <option>Unknown</option>
                        </select>
                    </div>
                    <div id="button">
                        <button className="btn btn-outline btn-primary"
                                onClick={() => navigate("/customer/placeorder")}>Place Order
                        </button>
                    </div>
                </div>
            </div>


            <div className="divider"></div>

            <div className="flex items-center justify-center h-full p-4">
                {/* Container to center align the cards */}
                <div className="products flex flex-wrap justify-center gap-4 overflow-y-auto">
                    {/* Vertically scrollable cards with 4 cards in a row */}
                    {orders.map((order) => (
                        <div className="card card-compact w-80 bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    src={order['photos'].length > 0 ? order['photos'][0] : "https://placehold.co/600x400"}
                                    alt=""></img></figure>
                            <div className="card-body">
                                <h2 className="card-title">{order.device_name}</h2>
                                <p>Device Type: {order.device_type}</p>
                                <p>Category: {order.classification.toString().toUpperCase()}</p>
                                <p>Date of Order: {order.date}</p>
                                <p>Price: {order.price}</p>
                                <p>Order By: {order.name}</p>
                                {/*<div className="card-actions justify-end">*/}
                                {/*    <button className="btn btn-primary">Buy Now</button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
