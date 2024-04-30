import React, {useEffect, useState} from 'react';
import CustomerNavbar from "../../../components/customerNavbar";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EditOrder = () => {
    const [brand, setBrand] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [selectService, setSelectService] = useState('');
    const [typeOfService, setTypeOfService] = useState('');
    const [dataRetrieval, setDataRetrieval] = useState('');
    const [dataWiping, setDataWiping] = useState('');
    const location = useLocation();
    const [orderItem, setOrderItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        setOrderItem(location.state?.orderItem)
        console.log("In Use Effect" + orderItem)
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the payload from the state
        const payload = {
            device_id: orderItem.device_id,
            device_name: brand,
            device_type: deviceType,
            classification: category,
            price: price,  // You might need to handle image uploads separately depending on your backend
            service: typeOfService,
            // Include other necessary fields
        };

        // URL construction with the order ID
        const url = `http://127.0.0.1:5000/api/devices/${orderItem.device_id}/edit`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            setIsLoading(true); // Set isLoading to true before making async requests


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Success:", responseData);
            // Here you can handle further logic after a successful update,
            // such as redirecting the user or displaying a success message.
        } catch (error) {
            console.error("Error updating order:", error);
        }
        finally {
            setIsLoading(false); // Set isLoading to false after async requests are completed
            navigate('/customer/orders');

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
                <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
                {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <p className="text-gray-600">Submitting...</p>
                        </div>
                    ) :
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="brand" className="block mb-1">Name:</label>
                        <input placeholder={orderItem?.device_name} type="text" id="brand" value={brand}
                               onChange={(e) => setBrand(e.target.value)}
                               className="form-input w-full border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deviceType" className="block mb-1">Device Type:</label>
                        <select defaultValue="Mobile" id="deviceType" value={deviceType}
                                onChange={(e) => setDeviceType(e.target.value)}
                                className="form-select w-full border border-gray-300 rounded-md">
                            <option value="">Select Device Type</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-1">Category:</label>
                        <select defaultValue="current" id="category" value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                        <input placeholder={orderItem?.price} type="number" id="price" value={price}
                               onChange={(e) => setPrice(e.target.value)}
                               className="form-input w-full border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="block mb-1">Upload Images:</label>
                        <input type="file" id="images" onChange={handleImageUpload} multiple
                               className="form-input w-full border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="typeOfService" className="block mb-1">Type of Service:</label>
                        <select id="typeOfService" value={typeOfService}
                                onChange={(e) => setTypeOfService(e.target.value)}
                                className="form-select w-full border border-gray-300 rounded-md">
                            <option value="">Select</option>
                            <option value="Data Retrieval">Data Retrieval</option>
                            <option value="Data Wiping">Data Wiping</option>
                            <option value="Data Wiping & Data Retrieval">Both</option>
                        </select>
                    </div>

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
                }
            </div>
        </div>
    );
};

export default EditOrder;
