import React from 'react';
import Navbar from "../../components/navbar";
import CustomerNavbar from "../../components/customerNavbar";
import { useState } from 'react';

const ProfilePage = () => {

    const user = {
        name: "John",
        email: "john@gmail.com",
        contact: "03221545554"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [contact, setContact] = useState(user.contact);

    return (

        <div>
            <CustomerNavbar/>
            <div className="flex justify-center items-center h-screen">
                <div className="max-w-md p-8 border rounded-md">
                    <h2 className="text-2xl font-bold mb-4">User Information</h2>
                    <div className="mb-4">
                        <label className="block mb-1">Name: {user.name}</label>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email Address: {user.email}</label>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Contact Number: {user.contact}</label>
                    </div>
                    {/*<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">*/}
                    {/*    Edit*/}
                    {/*</button>*/}
                    <div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_1').showModal()}>Edit Details</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="brand" className="block mb-1">Name:</label>
                                        <input type="text" id="brand" value={name}
                                               onChange={(e) => setName(e.target.value)}
                                               className="form-input w-full border border-gray-300 rounded-md"/>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="brand" className="block mb-1">Contact:</label>
                                        <input type="text" id="brand" value={contact}
                                               onChange={(e) => setContact(e.target.value)}
                                               className="form-input w-full border border-gray-300 rounded-md"/>
                                    </div>

                                    <div className="modal-action">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-primary">Submit</button>
                                    </div>
                                </form>

                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
