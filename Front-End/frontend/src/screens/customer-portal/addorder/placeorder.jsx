import React, { useState } from 'react';
import CustomerNavbar from "../../../components/customerNavbar";
import axios from "axios";
import { useStoreLogin } from "../../../stores/store-login"

const PlaceOrder = () => {
    const [brand, setBrand] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [selectService, setSelectService] = useState('');
    const [typeOfService, setTypeOfService] = useState('');
    const [dataRetrieval, setDataRetrieval] = useState('');
    const [dataWiping, setDataWiping] = useState('');

    const {loggedUser, updateLoggedUser} = useStoreLogin();


    let baseUrl = "http://127.0.0.1:5000/api";

    function getCurrentDateAsString() {
        const currentDate = new Date(); // Get the current date and time
        const year = currentDate.getFullYear(); // Get the year
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (adding 1 because months are zero-indexed)
        const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day of the month
        const dateString = `${year}-${month}-${day}`; // Combine year, month, and day with dashes

        return dateString;
    }


    function generateRandomId() {
        const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
        return randomNumber.toString(); // Converts the random number to a string
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let orderId = generateRandomId()
        let deviceId = generateRandomId()
        let paymentId = generateRandomId()
        let datadetailId = generateRandomId()
        let qrId = generateRandomId()
        let date = getCurrentDateAsString()

        try {
            const formData = {
                brand: brand,
                deviceType: deviceType,
                category: category,
                price: price,
                images: images,
                selectService: selectService,
                typeOfService: typeOfService,
                dataRetrieval: dataRetrieval,
                dataWiping: dataWiping
            };


            const requestOne =
                await axios.post(`${baseUrl}/orders/new`, {
                    order_id: orderId,
                    user_id: loggedUser.user_id,
                    device_id: deviceId,
                    date: date,
                    paymentId: paymentId,
                    qrId: qrId,
                    visibility: true,
                    status: "pending",
                    data_detail_id: datadetailId

                })

            const requestTwo = await axios.post(`${baseUrl}/devices/new`, {
                    device_id: deviceId,
                    device_name: brand,
                    device_type: deviceType,
                    photos: ['photo1.jpg', 'photo2.jpg'],
                    price: price,
                    classification: category,
                    flag: false

                })
            const requestThree =    await axios.post(`${baseUrl}/payments/new`, {
                    payment_id: paymentId,
                    amount: price,
                    date: date

                })
            const requestFour = await axios.post(`${baseUrl}/data_detail/new`, {
                    data_detail_id: datadetailId,
                    data_link: "link"

                })
                // Add more requests as needed

            // Optionally, clear form data after successful submission
            setBrand('');
            setDeviceType('');
            setCategory('');
            setPrice('');
            setImages([]);
            setSelectService('');
            setTypeOfService('');
            setDataRetrieval('');
            setDataWiping('');


        } catch (error) {
            console.error('Error sending data to the backend:', error);
        }
    };






    const handleImageUpload = (e) => {
        const fileList = e.target.files;
        const imageArray = Array.from(fileList);
        setImages(imageArray);
    };

    return (
        <div>
            <CustomerNavbar/>
            <div className="max-w-md mx-auto p-8 border rounded-md">
                <h2 className="text-2xl font-bold mb-4">Place Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="brand" className="block mb-1">Name:</label>
                        <input type="text" id="brand" value={brand} onChange={(e) => {
                            setBrand(e.target.value)
                        }
                        }
                               className="form-input w-full border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deviceType" className="block mb-1">Device Type:</label>
                        <select id="deviceType" value={deviceType} onChange={(e) => setDeviceType(e.target.value)}
                                className="form-select w-full border border-gray-300 rounded-md">
                            <option value="">Select Device Type</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-1">Category:</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}
                                className="form-select w-full border border-gray-300 rounded-md">
                            <option value="">Select Category</option>
                            <option value="current">Current</option>
                            <option value="rare">Rare</option>
                            <option value="recyclable">Recyclable</option>
                            <option value="unknown">Unknown</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block mb-1">Price:</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}
                               className="form-input w-full border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="block mb-1">Upload Images:</label>
                        <input type="file" id="images" onChange={handleImageUpload} multiple
                               className="form-input w-full border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="selectService" className="block mb-1">Select Service:</label>
                        <select id="selectService" value={selectService} onChange={(e) => setSelectService(e.target.value)}
                                className="form-select w-full border border-gray-300 rounded-md">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    {selectService === 'yes' && (
                        <div className="mb-4">
                            <label htmlFor="typeOfService" className="block mb-1">Type of Service:</label>
                            <select id="typeOfService" value={typeOfService}
                                    onChange={(e) => setTypeOfService(e.target.value)}
                                    className="form-select w-full border border-gray-300 rounded-md">
                                <option value="">Select</option>
                                <option value="dataRetrieval">Data Retrieval</option>
                                <option value="dataWiping">Data Wiping</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                    )}
                    {(typeOfService === 'dataRetrieval' || typeOfService === 'both') &&   (
                        <div className="mb-4">
                            <label htmlFor="dataRetrieval" className="block mb-1">Data Retrieval:</label>
                            <select id="dataRetrieval" value={dataRetrieval} onChange={(e) => setDataRetrieval(e.target.value)}
                                    className="form-select w-full border border-gray-300 rounded-md">
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    )}
                    {(typeOfService === 'dataWiping' || typeOfService === 'both') && (
                        <div className="mb-4">
                            <label htmlFor="dataWiping" className="block mb-1">Data Wiping:</label>
                            <select id="dataWiping" value={dataWiping} onChange={(e) => setDataWiping(e.target.value)}
                                    className="form-select w-full border border-gray-300 rounded-md">
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-1">Uploaded Images:</label>
                        <div className="flex flex-wrap">
                            {images.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`}
                                     className="w-20 h-20 object-cover m-1"/>
                            ))}
                        </div>
                    </div>
                    <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PlaceOrder;
