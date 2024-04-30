import CustomerNavbar from "../../components/customerNavbar";
import React, {useEffect, useState} from "react";
import {useStoreLogin} from "../../stores/store-login";
import {OrderTable} from "../customer-portal/ordertable/ordertable";
import {useNavigate} from "react-router-dom";



export const Orders = () => {

    let navigate = useNavigate();

    let baseUrl = "http://127.0.0.1:5000/api";


    const [orders, setOrders] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [deviceTypeFilter, setDeviceTypeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [loading, setLoading] = useState(false); // Loading state



    const {loggedUser, updateLoggedUser} = useStoreLogin();

    let userID = loggedUser.user_id


    //css

    const spinnerStyle = {
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #3498db",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "spin 2s linear infinite"
    };

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

    const filterOrders = (orders) => {
        return orders
            .filter((order) => {
                // Filter by device type if filter is set
                return deviceTypeFilter ? order.device_type === deviceTypeFilter : true;
            })
            .filter((order) => {
                // Filter by category if filter is set
                return categoryFilter ? order.classification === categoryFilter : true;
            });
    };

    // Implement the sorting function
    const sortOrders = (filteredOrders) => {
        switch (sortCriteria) {
            case 'Date Added':
                // Assuming 'date' is in a format that can be compared directly
                return filteredOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'Price (Ascending)':
                return filteredOrders.sort((a, b) => a.price - b.price);
            case 'Price (Descending)':
                return filteredOrders.sort((a, b) => b.price - a.price);
            default:
                return filteredOrders; // No sorting applied
        }
    };

    useEffect(() => {
        // This code will be executed once when the component mounts

        async function fetchFilteredOrders(userID) {
            setLoading(true); // Start loading
            try {
                // Fetch orders data based on user_id from the backend API
                const ordersResponse = await fetch(`${baseUrl}/orders/user/${userID}`);
                if (!ordersResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }


                const orders = await ordersResponse.json();


                const serviceResponse = await fetch(`${baseUrl}/service`);
                if (!serviceResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const services = await serviceResponse.json()

                // Fetch all devices from the backend API
                const devicesResponse = await fetch(`${baseUrl}/devices`);
                if (!devicesResponse.ok) {
                    throw new Error('Failed to fetch devices');
                }
                const devices = await devicesResponse.json();

                const qrResponse = await fetch(`${baseUrl}/qr_code`);
                if (!qrResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const qr_code = await qrResponse.json()

                // Map all devices to their orders based on the device_id
                const filteredOrders = orders.map(order => {
                    const device = devices.find(device => device.device_id === order.device_id);
                    const service = services.find(service => service.service_id === order.service_id)
                    const qr = qr_code.find(qr => qr.qr_id === order.qr_id)
                    return {
                        device_id: device.device_id,
                        device_name: device.device_name,
                        device_type: device.device_type,
                        classification: device.classification,
                        order_id: order.order_id,
                        date: order.date,
                        status: order.status,
                        price: device.price,
                        photos: device.photos,
                        service_name: service.service_name,
                        data_detail_id: order.data_detail_id,
                        qr_code: qr.qr_link
                    };
                });
                console.log(orders)
                setOrders(filteredOrders)
                setLoading(false);

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

    const filteredAndSortedOrders = sortOrders(filterOrders(orders));

    // Event handlers for select elements
    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    const handleDeviceTypeChange = (event) => {
        setDeviceTypeFilter(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategoryFilter(event.target.value);
    };








    return (
        <div>
            <div>
                <CustomerNavbar/>
                {
                    loading
                    ? <div className="flex justify-center items-center h-screen">
                            <div style={spinnerStyle}>
                        </div>
                    </div>
                    : <div></div>}
            </div>
            <h1 className="text-2xl font-bold mb-4 p-4" style={{textAlign: "center"}}>Order Details</h1>
            <div className="divider"></div>


            <div className="flex items-center justify-center h-full">

                {/* Container to center align the div */}
                <div className="p-4 flex flex-row items-center justify-between">
                    <div id="sort" className="mr-2 pr-10 justify-start">
                        <select className="select select-bordered max-w-xs" onChange={handleSortChange}>
                            <option disabled selected>Sort By</option>
                            <option>Date Added</option>
                            <option>Price (Ascending)</option>
                            <option>Price (Descending)</option>
                        </select>
                    </div>
                    <div id="type" className="mr-2 pr-10 ">
                        <select className="select select-bordered max-w-xs basis-1/3" onChange={handleDeviceTypeChange}>
                            <option disabled selected>Device Type</option>
                            <option>Tablet</option>
                            <option>Laptop</option>
                            <option>Mobile</option>
                            <option>Smartwatch</option>
                        </select>
                    </div>
                    <div id="category" className="mr-60 pr-100">
                        <select className="select select-bordered max-w-xs basis-1/3" onChange={handleCategoryChange}>
                            <option disabled selected>Category</option>
                            <option>current</option>
                            <option>rare</option>
                            <option>recyclable</option>
                            <option>unknown</option>
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
            <div>
                <div>
                    <OrderTable tableData={filteredAndSortedOrders}
                                onClick={() => document.getElementById('my_modal_3').showModal()}
                                onClick1={() => {
                                    navigate("/customer/editorder")
                                }}/>
                </div>
            </div>
        </div>
    )
}
