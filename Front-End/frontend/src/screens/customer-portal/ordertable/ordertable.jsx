import * as PropTypes from "prop-types";
import Navbar from "../../../components/navbar";
import CustomerNavbar from "../../../components/customerNavbar";
import {Link, useNavigate} from "react-router-dom";

function OrderModal(props) {
    return <th>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-ghost" onClick={props.onClick}>Details</button>
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                    </button>
                </form>
                <div className="bg-base-100 shadow-xl">
                    <figure><img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {props.orderItem.device_name}
                            <div className="badge badge-warning">{props.orderItem.status}</div>
                        </h2>
                        <p>Device Type: {props.orderItem.device_type}</p>
                        <p>Category: {props.orderItem.classification}</p>
                        <p>Date of Order: {props.orderItem.date}</p>
                        <p>Price: {props.orderItem.price}</p>
                        <div className="card-actions justify-end">
                            <button onClick={props.onClick1} className="btn btn-outline">Edit Device
                                Details
                            </button>
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
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png"
                             alt="Avatar Tailwind CSS Component"/>
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
        <OrderModal orderItem = {props.order} onClick={props.onClick} onClick1={props.onClick1}/>
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