import { useEffect, useState } from "react";
import axios from "axios";
import AdminPlaceOrder from "./adminplaceorder";

const AdminDashboardTable = ({ orders }) => {
  const [deviceOrderDetails, setDeviceOrderDetails] = useState({});

  const openModalWithData = () => {};

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
        const result =  response.data; // Return the response data
        const mappedResult =  result.map((item) => {
          const { _id, ...rest } = item;
          return rest;
        });

        const finalRes = mappedResult.map(async (item) => {
          let url = `http://127.0.0.1:5000/api/users/${item.user_id}`;
          let user_data = await fetchDataUrl(url);
          url = `http://127.0.0.1:5000/api/devices/${item.device_id}`;
          let device_data = await fetchDataUrl(url);
          const { user_id, device_id, ...rest } =  item;

          let user_name =  user_data["name"];


          let finalThing = { Name: user_name, ...device_data , ...rest };
          return finalThing;
        });

        const finalResult = await Promise.all(finalRes);

        setOrderLists(finalResult);


        /*const fetchDataInterval = setInterval(() => {
        Promise.all(finalRes).then(res => {
            setOrderLists(finRes);
        });

            
          }, 1000);
      
          return () => clearInterval(fetchDataInterval);*/


      } catch (error) {
        throw error; // Throw the error for handling in the component
      }
    };

    fetchOrderData();
  }, []);

  const [orderLists, setOrderLists] = useState([]);

  return (
    <div className="overflow-x-auto w-full ">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Date</th>
            <th>Order ID</th>
            <th>Status</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderLists.map((order, index) => {
            return (
              <tr>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                </td>
                <td>{order["Name"]}</td>
                <td>{order['device_name']}</td>
                <td>{order["date"]}</td>
                <td>{order["order_id"]}</td>
                <td>{order["status"]}</td>
                <td>{order["price"]}</td>
                <td>
                  {order["status"] === "Pending" && (
                    <div>
                      <button
                        className="btn"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        Edit
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Details</h3>
                          <p className="py-4"></p>
                          <div className="modal-action">
                            <AdminPlaceOrder
                              orderState = {orderLists}
                              handleState = {setOrderLists}
                              orderList={order}
                              index = {index}
                            ></AdminPlaceOrder>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardTable;
