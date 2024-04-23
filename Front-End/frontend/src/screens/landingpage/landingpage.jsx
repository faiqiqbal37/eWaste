import React, { useState, useEffect }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eWasteImage from './ewaste2.jpg';
import deviceLifespanImage from './ewaste3.jpg';
import environmentalPreservationImage from './ewaste5.jpg';
import dataSecurityImage from './ewaste6.jpg';
const LandingPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    let baseUrl = "http://127.0.0.1:5000/api";
    // Fetch data on component mount
    useEffect(() => {
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

        fetchAllOrders()
    }, []);

    return (
        <>
            {/* Navbar Section */}
            <nav className="bg-green-500 p-4 flex justify-between items-center">
                <a href="/" className="text-white text-xl font-bold flex items-center">
                    <span className="font-semibold text-lg">eWaste</span>
                </a>
                <ul className="flex justify-between items-center">
                    <li className="mx-4">
                        <Link to="/" className="text-white">Home</Link>
                    </li>
                    <li className="mx-4">
                        <Link to="/faq" className="text-white">FAQ</Link>
                    </li>
                    <li className="mx-4">
                        <button
                            onClick={() => {
                                navigate("/login")
                            }} className="btn btn-ghost">Sign In
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Hero Section */}
            <div className="bg-green-500 p-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white">
                        <h1 className="text-4xl font-bold">eWaste Hub : Recycle Smart</h1>
                        <p className="mt-4 text-lg">Unlock the potential in your eWaste! Recycle or sell your old devices with eWaste Hub – maximizing value, ensuring security, and promoting sustainable tech practices.</p>
                    </div>
                    <div className="md:block">
                        <img id="main__img" src={eWasteImage} alt="eWaste Hub" className="w-[850px]"/>

                    </div>
                </div>
            </div>
            {/* Device Section */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-6">Available Devices</h2>
                    <div className="flex items-center justify-center h-full p-4">
                        <div className="products flex flex-wrap justify-center gap-4 overflow-y-auto">
                            {orders.map((order) => (
                                <div className="card card-compact w-80 bg-base-100 shadow-xl"
                                     key={order.id}> {/* Assuming orders have an 'id' property */}
                                    <figure>
                                        <img
                                            src={order['photos'].length > 0 ? order['photos'][0] : "https://placehold.co/600x400"}
                                            alt=""></img>
                                    </figure>
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
            </section>

            {/* Mission Section */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Mission</h2>
                    <p className="text-lg">Empowering a sustainable future, our mission at eWaste is to revolutionize
                        the lifecycle of electronic devices. We aim to inspire responsible consumption by providing a
                        seamless platform for recycling and selling unused gadgets. Through cutting-edge technology and
                        a commitment to data security, we strive to maximize the value of eWaste, promote environmental stewardship, and contribute to a greener, smarter world.</p>
                </div>
            </section>

            {/* Services Section */}
            <div className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Environmental Preservation */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <img src={environmentalPreservationImage} alt="Environmental Preservation"
                             className="mb-4 w-full h-48 object-cover rounded-t-lg"/>

                        <h2 className="text-2xl font-semibold mb-4">Environmental Preservation</h2>
                        <p>Recycle or sell your electronic devices with us to help preserve the environment. By doing
                            so, you contribute to reducing eWaste, minimizing pollution, and conserving valuable
                            resources.</p>
                    </div>

                    {/* Maximize Device Lifespan */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <img src={deviceLifespanImage} alt="deviceLifespan"
                             className="mb-4 w-full h-48 object-cover rounded-t-lg"/>

                        <h2 className="text-2xl font-semibold mb-4">Maximize Device Lifespan</h2>
                        <p>Make your devices count! Recycling or selling through our platform ensures extended use,
                            minimizing electronic waste and promoting resource conservation.</p>
                    </div>

                    {/* Data Security Assurance */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                    <img src={dataSecurityImage} alt="data security"
                             className="mb-4 w-full h-48 object-cover rounded-t-lg"/>

                        <h2 className="text-2xl font-semibold mb-4">Data Security Assurance</h2>

                        <p>Protect your sensitive information. Our platform guarantees secure data erasure and disposal,
                            ensuring your privacy and peace of mind.</p>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto">
                    <p className="text-center">Contact Us: <a href="mailto:ewaste@gmail.com">ewaste@gmail.com</a> | Sheffield, UK | 01099898989</p>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
