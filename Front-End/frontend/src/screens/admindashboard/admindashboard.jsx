import axios from "axios";
import Navbar from "../../components/navbar";
import React, { useState, useEffect } from "react";
import AdminDashboardStats from "../../components/admindashboardstats";
import AdminDashboardTable from "../../components/admindashboardtable";

const AdminDashboard = () => {
  const [numberOfStaff, setNumberOfStaff] = useState(0);
  const [numberOfProcessedOrders, setNumberOfProcessedOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [numUsers, setNumUsers] = useState([]);

  useEffect(() => {
    const fetchDataUrl = async (url) => {
      try {
        const res = await axios.get(url);
        const result = res.data;
        return result;
      } catch (error) {
        throw error;
      }
    };

    const fetchData = async () => {
      let endpoints = [
        "/users/staff",
        "/users/admins",
        "/orders",
        "/users/customers",
      ];
      let baseUrl = "http://127.0.0.1:5000/api";

      try {
        let data = await Promise.all(
          endpoints.map(async (url) => {
            let currData = await fetchDataUrl(baseUrl + url);
            return currData;
          })
        );

        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getNumberOfProcessedOrders = (data) => {
      let pendingItems = data.map((item) => {
        let statusOfItem = item["status"] === "Processed" ? 1 : 0;
        return statusOfItem;
      });
      const initialValue = 0;
      const sumWithInitial = pendingItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      return sumWithInitial;
    };

    fetchData().then((res) => {
      setNumberOfStaff(res[0].length + res[1].length);
      setNumberOfProcessedOrders(getNumberOfProcessedOrders(res[2]));
      setOrders(res[2]);
      setNumUsers(res[3].length);
    });

     /*const fetchDataInterval = setInterval(() => {
      fetchData().then((res) => {
        setNumberOfStaff(res[0].length + res[1].length);
        setNumberOfProcessedOrders(getNumberOfProcessedOrders(res[2]));
        setOrders(res[2]);
        setNumUsers(res[3].length);
      });
    }, 1000);

    return () => clearInterval(fetchDataInterval);*/
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="divider"></div>
      <AdminDashboardStats
        numberOfStaff={numberOfStaff}
        numberOfUsers={numUsers}
        numberOfProcessedOrders={numberOfProcessedOrders}
      ></AdminDashboardStats>
      <div className="divider"></div>
      <div className="flex w-full">
        <div className="grid flex-grow  bg-base-300 rounded-box place-items-center">
          <AdminDashboardTable orders={orders}></AdminDashboardTable>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid h-20 flex-grow  bg-base-300 rounded-box place-items-center">
          content
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
