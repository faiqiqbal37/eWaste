import React, { useState, useEffect } from 'react';
import StaffNavbar from "../../components/staffNavbar";
import AdminStaffTable from "../../components/adminstafftable"; // Assuming you have a component named AdminStaffTable
import axios from "axios";
import AdminTable from "../../components/admintable";

const UserInfo = () => {
    const [staffData, setStaffData] = useState([]); // Corrected useState usage

    useEffect(() => {
        const fetchDataUrl = async (url) => {
            try {
                const res = await axios.get(url);
                return res.data;
            } catch (error) {
                throw error;
            }
        };

        const fetchStaffData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/orders");
                const result = response.data; // Removed unnecessary await
                const mappedResult = result.map(async (item) => {
                    const { _id, ...rest } = item;
                    const user_data = await fetchDataUrl(`http://127.0.0.1:5000/api/users/${item.user_id}`);
                    const device_data = await fetchDataUrl(`http://127.0.0.1:5000/api/devices/${item.device_id}`);
                    const user_name = await user_data["name"];
                    const device_name = await device_data["device_name"];
                    const finalThing = { "Name": user_name, "Device": device_name, ...rest };
                    return finalThing;
                });
                const finRes = await Promise.all(mappedResult);
                setStaffData(finRes);
            } catch (error) {
                console.error("Error fetching staff data:", error);
            }
        };

        fetchStaffData(); // Call the fetchStaffData function
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <div className="overflow-x-auto">
            <StaffNavbar/>
            {staffData.length > 0 ? (
                <AdminTable itemList={Object.keys(staffData[0])} orderList={staffData}/>
            ) : (
                <p>No items to display.</p>
            )}
        </div>
    );
}

export default UserInfo;
