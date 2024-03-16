import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUploader from "./imageupload";

const AdminPlaceOrder = ({ orderList, index, orderState, handleState }) => {
  const [brand, setBrand] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [visibility, setVisibility] = useState("");
  const [base64Strings, setBase64Strings] = useState([]);

  const handleImageUpload = async (e) => {
    const fileList = e.target.files;
    const imageArray = Array.from(fileList);
    setImages(imageArray);
    console.log(images)
  };


  useEffect(() => {
    setBrand(orderList["device_name"]);
    setDeviceType(orderList["device_type"]);
    setCategory(orderList["classification"]);
    setPrice(orderList["price"]);
    setImages(orderList["photos"]);
    setVisibility(orderList["visibility"] ? "True" : "False");
    setBase64Strings([]);
  }, []);

  const discardChange = () => {
    setBrand(orderList["device_name"]);
    setDeviceType(orderList["device_type"]);
    setCategory(orderList["classification"]);
    setPrice(orderList["price"]);
    setImages(orderList['photos']);
    setVisibility(orderList["visibility"] ? "True" : "False");
  };

  const saveChange = async () => {
    let url = `http://127.0.0.1:5000/api/devices/${orderList["device_id"]}/edit`;
    let deviceObj = {
      device_id: orderList["device_id"],
      device_name: brand,
      device_type: deviceType,
      classification: category,
      price,
      photos: base64Strings.length > 0 ? base64Strings : images,
      flag: orderList["flag"],
    };

    try {
      const response = await axios.put(url, deviceObj);
      const result = await response.data;
      let orderArr = [...orderState];
      let vis = visibility === "True" ? true : false
      let visibilityObj = {"visibility": vis, "order_id": orderArr[index]['order_id']}
      url = `http://127.0.0.1:5000/api/orders/${visibilityObj['order_id']}/edit`
      const visRes = await axios.put(url, visibilityObj)
      let finalObject = {...orderArr[index], ...deviceObj, "visibility": vis}
      orderArr[index] = finalObject
      handleState(orderArr);
      setBase64Strings([]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}

        <div className="max-w mx-auto p-8 pl-12 pr-14">
          <div className="mb-4">
            <label htmlFor="brand" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              className="form-input w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deviceType" className="block mb-1">
              Device Type:
            </label>
            <select
              id="deviceType"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="form-select w-full border border-gray-300 rounded-md"
            >
              <option value="" disabled hidden>
                Select Device Type
              </option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-1">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select w-full border border-gray-300 rounded-md"
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              <option value="current">Current</option>
              <option value="rare">Rare</option>
              <option value="recyclable">Recyclable</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="deviceType" className="block mb-1">
              Visibility
            </label>
            <select
              id="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="form-select w-full border border-gray-300 rounded-md"
            >
              <option value="" disabled hidden>
                Select Device Visibility
              </option>
              <option value="True">Show</option>
              <option value="False">Hide</option>
            </select>
          </div>  
              {/*Insert Image Code here*/}
              <ImageUploader base64Strings={base64Strings} setBase64Strings={setBase64Strings}></ImageUploader>


        </div>
        <button
          className="m-3 w-20 btn btn-success text-white"
          onClick={saveChange}
        >
          Save
        </button>
        <button className="mr-3 w-20 btn btn-primary text-white">Store</button>
        <button
          className="w-20 btn btn-error text-white"
          onClick={discardChange}
        >
          Discard
        </button>
      </form>
    </div>
  );
};

export default AdminPlaceOrder;
