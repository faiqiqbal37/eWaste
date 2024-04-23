import axios from "axios";
import { useEffect, useState } from "react";
import AdminEditUser from "./adminedituser";
import AdminUserStatistics from "./adminuserstats";
import Searchbar from "./searchbar";

const AdminTableUsers = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [constUserDetails, setConstUserDetails] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const filterFunction = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    const searchValue = searchVal.toLowerCase();
    const filteredList = constUserDetails.filter((user) => {
      const lowerCaseName = user.name.toLowerCase();
      const lowerCaseEmail = user.email.toLowerCase();
      const lowerCaseContact = user.contact.toLowerCase();

      return (
        lowerCaseName.includes(searchValue) ||
        lowerCaseEmail.includes(searchValue) ||
        lowerCaseContact.includes(searchValue)
      );
    });

    setUserDetails(filteredList);
  }, [searchVal, constUserDetails]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/users/customers"
      );
      const result = response.data;

      return result;
    } catch (error) {
      return Promise.resolve([]);
    }
  };

  const updateUsersList = (newAdminLists) => {
    setUserDetails(newAdminLists);
    fetchUserData().then((res)=>{
        setConstUserDetails(res)
    })
  };

  useEffect(() => {
    fetchUserData().then((res) => {
      setConstUserDetails(res);
      setUserDetails(res);
    });
  }, []);

  const updateUsersListByIndex = (index) => {
    const updateUser = (state) => {
      const newArray = [...userDetails];
      newArray[index] = state;
      updateUsersList([...newArray]);
    };
    return updateUser;
  };

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchVal}
          onChange={filterFunction}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((user, index) => {
              return (
                <tr key={index} className="hover">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>
                    <button
                      className="btn hover:bg-sky-700"
                      onClick={() =>
                        document
                          .getElementById("my_modal_" + JSON.stringify(user))
                          .showModal()
                      }
                    >
                      Edit
                    </button>
                    <dialog
                      id={"my_modal_" + JSON.stringify(user)}
                      className="modal"
                    >
                      <div className="modal-box">
                        <AdminEditUser
                          currentUser={user}
                          updateList={updateUsersListByIndex(index)}
                        />
                        <div className="modal-action">
                          <form method="dialog"></form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                  <td>
                    <button
                      className="btn hover:bg-sky-700"
                      onClick={() =>
                        document
                          .getElementById("my_modal_" + JSON.stringify(user)+"_statistics")
                          .showModal()
                      }
                    >
                      Statistics
                    </button>
                    
                    <dialog
                      id={"my_modal_" + JSON.stringify(user)+"_statistics"}
                      className="modal"
                    >
                      <div className="modal-box">
                        <AdminUserStatistics
                          currentUser={user}
                        />

                        <div className="modal-action">
                          <form method="dialog"></form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTableUsers;
