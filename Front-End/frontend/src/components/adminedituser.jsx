import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminEditUser = ({ currentUser, updateList }) => {
  const [user, setUser] = useState({});

  const discardChange = () => {
    setUser({ ...currentUser });
  };

  const saveChange = async () => {
    let url = `http://127.0.0.1:5000/api/users/${currentUser.user_id}/edit`;
    let name = user['name']===undefined ? currentUser.name : user['name']
    let email = user['email']===undefined ? currentUser.email : user['email']
    let contact = user['contact']===undefined ? currentUser.contact : user['contact']

    let userObj = {...currentUser, name, email, contact}

    console.log(userObj)

    delete userObj['_id'];

    try {
      const response = await axios.put(url, userObj);
      const result = await response.data;
      setUser(userObj);
      updateList(userObj);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <form method="dialog">
        <div className="max-w mx-auto mt-10 pl-12 pr-14">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              value={user['name']===undefined ? currentUser.name : user['name']} 
              onChange={(e) =>
                setUser((prevUser) => ({...currentUser, ...prevUser, "name": e.target.value }))
              }
              className="form-input w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="max-w mx-auto pl-12 pr-14">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="text"
              value={user['email']===undefined ? currentUser.email : user['email']} 
              onChange={(e) =>
                setUser((prevUser) => ({...currentUser, ...prevUser, "email": e.target.value }))
              }
              className="form-input w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="max-w mx-auto pl-12 pr-14">
          <div className="mb-2">
            <label htmlFor="Contact" className="block mb-1">
              Contact:
            </label>
            <input
              type="text"
              value={user['name']===undefined ? currentUser.contact : user['contact']} 
              onChange={(e) =>
                setUser((prevUser) => ({
                    ...currentUser,
                  ...prevUser,
                  "contact": e.target.value,
                }))
              }
              className="form-input w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="w-20 m-2 btn btn-success text-white"
            onClick={saveChange}
          >
            Save
          </button>
          <button
            className="w-20 m-2 btn btn-error text-white"
            onClick={discardChange}
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditUser;
