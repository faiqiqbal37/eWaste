import React from 'react';
import axios from "axios";


const AdminStaffTable = ({ staffList }) => {


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
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => {
            const orderRoles = (role) => {
                const roleList = ["admin", "staff"];
                const currentStaffRole = roleList.filter((roleMem)=>{
                    if (role === roleMem){
                        return false
                    }
                    else{
                        return true
                    }
                })

                return currentStaffRole
                
            };

            let roles = [staff.role, ...orderRoles(staff.role)]

            return (
              <tr>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>
                  <select className="select w-full max-w-xs" onChange={curriedHandleSelectChange(staff)}>
                    {
                        roles.map((role)=>{
                            return(<option >{role}</option>)
                        })
                    }
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStaffTable;
