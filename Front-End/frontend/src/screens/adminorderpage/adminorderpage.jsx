import Navbar from "../../components/navbar";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import AdminTable from "../../components/admintable";

const AdminOrderPage = () => {

    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        const fetchOrderData = async ()=>{
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/orders');
                const result = await response.data; // Return the response data
                const mappedResult = await result.map((item)=>{
                    const {_id, ...rest} = item
                    return rest
                })
                setOrderData(mappedResult)
            } catch (error) {
                throw error; // Throw the error for handling in the component
            }
        }

        fetchOrderData()

    }, [])

    return (
        <div>
            <Navbar />
            <AdminTable 
            itemList={["Data Detail ID", "Date", "Device ID", "Order ID", "Payment ID", "QR ID", "User ID"]}
             orderList={orderData}/>
        </div>
    );
};

export default AdminOrderPage;
