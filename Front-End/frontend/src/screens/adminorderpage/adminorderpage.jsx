import Navbar from "../../components/navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AdminTable from "../../components/admintable";

const AdminOrderPage = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchDataUrl = async (url) => {
      try {
        const res = await axios.get(url);
        const result = await res.data;
        return result;
      } catch (error) {
        throw error;
      }
    };

    const fetchOrderData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/orders");
        const result = await response.data; // Return the response data
        const mappedResult = await result.map((item) => {
          const { _id, ...rest } = item;
          return rest;
        });

        const finalRes = mappedResult.map(async (item) => {
          let url = `http://127.0.0.1:5000/api/users/${item.user_id}`;
          let user_data = await fetchDataUrl(url);
          url = `http://127.0.0.1:5000/api/devices/${item.device_id}`;
          let device_data = await fetchDataUrl(url);
          const { user_id, device_id, ...rest } = await item;

          let user_name = await user_data["name"];
          let device_name = await device_data["device_name"];

          let finalThing = { "Name": user_name, "Device": device_name, ...rest };
          return finalThing;
        });

        const finRes = await Promise.all(finalRes);

        setOrderData(finRes);
      } catch (error) {
        throw error; // Throw the error for handling in the component
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div>
      <Navbar />
      {orderData.length > 0 ? (
        <AdminTable itemList={Object.keys(orderData[0])} orderList={orderData} />
      ) : (
        <p>No items to display.</p>
      )}
    </div>
  );
};

export default AdminOrderPage;
