import React from 'react';
import axios from "axios";


const StaffTable = ({ staffList }) => {


    const curriedHandleSelectChange = (staff) => {
        const handleSelectChange = (event) => {
            const newVal = event.target.value
            const newStaff = {...staff, "role":newVal}
            changeRole(newStaff)
        }
        return handleSelectChange
    }

    const changeRole = async (staff) => {
        try{
            const response = await axios.put(`http://127.0.0.1:5000/api/users/${staff.user_id}/edit`, staff)
            const result = await response.data
            console.log('Data updated successfully:', result)
        } catch (error){
            throw error
        }
    }


    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>staff_id</th>
                </tr>
                </thead>
            </table>
        </div>
    );
};

export default StaffTable;
