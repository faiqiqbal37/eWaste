import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AdminPlaceOrder from "./adminplaceorder";


const AdminDashboardTable = ({ orders, changed }) => {
  const [deviceOrderDetails, setDeviceOrderDetails] = useState({});
  const [orderLists, setOrderLists] = useState([]);



  const updateOrderLists = (newOrderLists) => {
    setOrderLists(newOrderLists);
    changed(prev => !prev)
  };



  const curriedApproveOrder = (index) => {
    const approveOrder = async () => {
      const updatedList = [...orderLists];
      
      updatedList[index].status = "Approved";
      
      const temp = { ...updatedList[index] };
      delete temp._id;
      
      try {

        let orderReq = await axios.get(`http://127.0.0.1:5000/api/orders/${updatedList[index].order_id}`)
        let orderData = orderReq.data
        delete orderData._id
        orderData.status = "Approved"

        await axios.put(`http://127.0.0.1:5000/api/orders/${updatedList[index].order_id}/edit`, orderData);
        
        setOrderLists(updatedList);
        
        changed(prev => !prev);
      } catch (error) {
        console.error("Error approving order:", error);
      }
    };

    return approveOrder;
  };


  useEffect(() => {
    const fetchDataUrl = async (url) => {
      try {
        const res = await axios.get(url);
        const result = await res.data;
        return result;
      } catch (error) {
        return [];
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

        let lastFive = (finalResult.length-5) <= 0 ? finalResult: finalResult.slice(finalResult.length-5, finalResult.length)

        setOrderLists(lastFive);


        /*const fetchDataInterval = setInterval(() => {
        Promise.all(finalRes).then(res => {
            setOrderLists(finRes);
        });

            
          }, 1000);
      
          return () => clearInterval(fetchDataInterval);*/


      } catch (error) {
        return []; // Throw the error for handling in the component
      }
    };

    fetchOrderData();
  }, []);


  return (
    <div className="overflow-x-auto w-full ">
      <table className="table">
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
              <tr key={index}>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={order['photos'] && order['photos'].length > 0 ? order['photos'][0] : "https://placehold.co/600x400"} alt=""></img>
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
                          document.getElementById("my_modal_"+index).showModal()
                        }
                      >
                        Edit
                      </button>
                      <button className="m-5" onClick={curriedApproveOrder(index)}>
                        Approve
                      </button>     
                      <dialog id={"my_modal_"+index} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Details</h3>
                          <p className="py-4"></p>
                          <div className="modal-action">
                            <AdminPlaceOrder
                              orderState = {orderLists}
                              handleState = {updateOrderLists}
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
