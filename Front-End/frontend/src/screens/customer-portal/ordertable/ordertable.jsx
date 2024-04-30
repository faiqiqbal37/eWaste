import * as PropTypes from "prop-types";
import Navbar from "../../../components/navbar";
import CustomerNavbar from "../../../components/customerNavbar";
import {Link, useNavigate} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useStoreLogin } from "../../../stores/store-login"


function OrderModal(props) {
    const navigate = useNavigate()
    const {loggedUser, updateLoggedUser} = useStoreLogin();

    let userID = loggedUser.user_id

    async function fetchDataAndSendMail(dataId, userId) {
        const dataEndpoint = `http://127.0.0.1:5000/api/data_detail/${dataId}`;
        const mailEndpoint = `http://127.0.0.1:5000/api/users/${userId}/mail`;
      
        try {
          // Fetch data from dataEndpoint
          const dataResponse = await fetch(dataEndpoint);
          
          if (!dataResponse.ok) {
            throw new Error(`Failed to fetch data! Status: ${dataResponse.status}`);
          }
          
          const data = await dataResponse.json();
          console.log('Fetched data:', data);
      
          // Send data to mailEndpoint
          const mailResponse = await fetch(mailEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Use fetched data as the body
          });
      
          if (!mailResponse.ok) {
            throw new Error(`Failed to send mail! Status: ${mailResponse.status}`);
          }
      
          const mailResponseData = await mailResponse.json();
          console.log('Mail sent successfully:', mailResponseData);
      
        } catch (error) {
          console.error('Error:', error);
        }
      }
    function redirectToWebuy(searchString) {
        // Encode the search string to make it URL-safe
        const encodedSearchString = encodeURIComponent(searchString);

        // Construct the final URL with the encoded search string as a query parameter
        const finalURL = `https://uk.webuy.com/search?stext=${encodedSearchString}`;

        // Redirect the user to the final URL
        window.open(finalURL, '_blank');
    }



    return <th>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-ghost" onClick={() => document.getElementById(`${props.orderItem.order_id}`).showModal()}>Details</button>
        <dialog id= {props.orderItem.order_id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                    </button>
                </form>
                <div className="bg-base-100 shadow-xl">
                    <figure>
                        <div>
                            <img
                                src={props.orderItem['photos'].length > 0 ? props.orderItem['photos'][0] : "https://placehold.co/600x400"}
                                alt=""></img>
                        </div>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {props.orderItem.device_name}
                            <div className="badge badge-warning">{props.orderItem.status}</div>
                        </h2>
                        <p>Device Type: {props.orderItem.device_type}</p>
                        <p>Category: {props.orderItem.classification}</p>
                        <p>Date of Order: {props.orderItem.date}</p>
                        <p>Price: {props.orderItem.price}</p>
                        <p>Additional Service: {props.orderItem.service_name}</p>

                        {props.orderItem.status!=="Processed"
                            ? <div className="card-actions justify-end">
                                <button onClick={() => {

                                    navigate('/customer/editorder', {state: {orderItem: props.orderItem}});
                                }} className="btn btn-outline">Edit Device
                                    Details
                                </button>
                            </div>
                            : <div></div>}
                        <div className="card-actions justify-end">
                            <button onClick={() => {
                                redirectToWebuy(props.orderItem.device_name)
                            }} className="btn btn-outline">3rd Party Listing
                            </button>
                        </div>
                        {props.orderItem.status === "Processed" && props.orderItem.classification === "recyclable"
                            ? <div className="card-actions justify-end">
                                <button onClick={() => {
                                    fetchDataAndSendMail(props.orderItem.data_detail_id, userID)
                                }} className="btn btn-outline">Get Data Link
                                </button>
                            </div>
                            : null}
                        <div className="card-actions justify-end">
                            {props.orderItem.qr_code && props.orderItem.status === "Processed" && props.orderItem.classification !== "recyclable"
                                ? <button className="btn btn-outline" onClick={() => {
                                    const formattedBase64Image = `data:image/png;base64,${props.orderItem.qr_code}`;
                                    window.open().document.write(`<img src="${formattedBase64Image}" alt="QR Code" style="width:20%; height:auto;"/>`)
                                }}>Show QR</button>
                                : <div></div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </th>;
}

OrderModal.propTypes = {
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};

function TableItem(props) {
    return <tr>
        <td>
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img
                            src={props.order['photos'].length > 0 ? props.order['photos'][0] : "https://placehold.co/600x400"}
                            alt=""></img>
                    </div>
                </div>
                <div>
                    <div className="font-bold">{props.order.device_name}</div>
                    <div className="text-sm opacity-50">Device Type: {props.order.device_type}</div>
                    <div className="badge badge-ghost badge-sm">Category: {props.order.classification}</div>
                </div>
            </div>
        </td>
        <td>
            Order ID: {props.order.order_id}
            <br/>
            <span className="badge badge-ghost badge-sm">Date: {props.order.date}</span>
        </td>
        {/*<td>Pending</td>*/}
        {props.order.status === "Pending"
            ? <td className="badge badge-warning badge-outline">{props.order.status}</td>
            : <td className="badge badge-success badge-outline">{props.order.status}</td>}

        <OrderModal orderItem={props.order} onClick={props.onClick} onClick1={props.onClick1}/>
        <td>
            {props.order.status === "Approved" && (props.order.classification === "recyclable") &&(
                <form
                    action={`http://127.0.0.1:5000/api/stripe/service/${props.order.device_name}/${props.order.order_id}/create-checkout-session`}
                    method="POST">
                    <button type="submit" className="btn">Checkout</button>
                </form>
            )}
            
        </td>
    </tr>;
}

TableItem.propTypes = {
    stateTwo: PropTypes.string,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};

export function OrderTable(props) {
    return <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>Device Details</th>
                <th>Order Details</th>
                <th>Current Status</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
            {props.tableData.map(order => (
            <TableItem stateTwo={props.stateTwo} order = {order} onClick={props.onClick} onClick1={props.onClick1}/>
            ))}


            </tbody>


        </table>
    </div>;
}

OrderTable.propTypes = {
    stateTwo: PropTypes.string,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};