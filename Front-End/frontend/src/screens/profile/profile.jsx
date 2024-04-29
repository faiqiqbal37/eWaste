import React, {useEffect} from 'react';
import Navbar from "../../components/navbar";
import CustomerNavbar from "../../components/customerNavbar";
import { useState } from 'react';
import axios from "axios";
import {useStoreLogin} from "../../stores/store-login";

const ProfilePage = () => {

    const [user, setUser] =useState( {
        name: "",
        email: "",
        contact: ""
    })

    const {loggedUser, updateLoggedUser} = useStoreLogin();

    let userId = loggedUser.user_id



    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [contact, setContact] = useState(user.contact);

    const updateUserProfile = async (userId, updatedProfile) => {
        try {
            const response = await axios.put(`http://127.0.0.1:5000/api/users/${userId}/edit`, updatedProfile);
            return response.data; // This will return the updated user profile from the server
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error; // Re-throw the error to handle it in the calling function
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here

        const updatedProfile = {
            user_id : userId,
            name, // These should be state variables that hold the updated name, email, and contact information
            email: user.email,
            contact
        };

        try {
            const updatedUser = await updateUserProfile(userId, updatedProfile);
            console.log('User profile updated:', updatedUser);
            // You might want to do something with the updated user data here,
            // like updating the local state or showing a success message to the user
        } catch (error) {
            // Handle the error, such as showing an error message to the user
        }

    };

    useEffect(() => {
        // Function to fetch user data based on ID
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/users/${userId}`);
                setUser(response.data); // Store user data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Check if userId is provided and user data is not already fetched
            fetchUser(); // Fetch user data

    }, []);

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
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block mb-1">Name:</label>
                                        <input type="text" id="name" value={name}
                                               onChange={(e) => setName(e.target.value)}
                                               className="form-input w-full border border-gray-300 rounded-md"/>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="contact" className="block mb-1">Contact:</label>
                                        <input type="text" id="contact" value={contact}
                                               onChange={(e) => setContact(e.target.value)}
                                               className="form-input w-full border border-gray-300 rounded-md"/>
                                    </div>
                                    <div className="modal-action">
                                        <button type="submit" className="btn btn-primary">Submit</button>
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
