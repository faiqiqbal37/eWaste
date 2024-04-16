import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminPieChart from "./adminpiechart";

const AdminDashboardStatusCount = () => {
  const [deviceTypeCount, setDeviceTypeCount] = useState({});

  const fetchUrl = async () => {
    try{
      let data = await axios.get(
        "http://127.0.0.1:5000/api/statistics/total_status_count"
      );
      data = data.data;
      return data;
    }
    catch(error){
      return []
    }
  };

  useEffect(() => {
    try {
      fetchUrl().then((data) => {
        setDeviceTypeCount(data);
      });
    } catch (error) {
      return []
    }
  }, []);

  const parseData = () => {
    if (Object.keys(deviceTypeCount).length === 0) {
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          },
        ],
      };
    } else {
      const data = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          },
        ],
      };
      for (const key in deviceTypeCount) {
        data["labels"].push(key);
        data["datasets"][0]['data'].push(deviceTypeCount[key])

        data["datasets"][0]['backgroundColor'].push(generateRandomColor())
        data["datasets"][0]['hoverBackgroundColor'].push(generateRandomColor())

      }
      return data;
    }
  };

  function generateRandomColor() {
    // Generate random values for red, green, and blue components
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    // Convert decimal values to hexadecimal format
    var redHex = red.toString(16).padStart(2, '0');
    var greenHex = green.toString(16).padStart(2, '0');
    var blueHex = blue.toString(16).padStart(2, '0');

    // Concatenate the hexadecimal values to form the color code
    var color = "#" + redHex + greenHex + blueHex;

    return color;
}

  return (
    <div>
      <h1>Order Status Count</h1>
      <AdminPieChart data={parseData()}/>
    </div>
  );
};

export default AdminDashboardStatusCount;
