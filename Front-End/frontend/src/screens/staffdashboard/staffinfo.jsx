import React, { useState, useEffect } from 'react';
import StaffNavbar from "../../components/staffNavbar";
import StaffTable from "../../components/staffpage";
import axios from "axios";

const StaffInfo = () => {
    const [staffData, setStaffData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/users");
                const data = response.data;
                setStaffData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStaffData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="overflow-x-auto">
            <StaffNavbar/>
            <StaffTable staffList={staffData}/>
        </div>
    );
};

export default StaffInfo;
