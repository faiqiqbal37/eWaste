import axios from "axios";
import Navbar from "../../components/navbar";
import React, { useState, useEffect } from "react";
import AdminDashboardStats from "../../components/admindashboardstats";
import AdminDashboardTable from "../../components/admindashboardtable";
import AdminDashboardUsersCount from "../../components/admindashboardusercount";
import AdminDashboardOrdersGraph from "../../components/admindashboardordersgraph";
import AdminDashBoardDeviceType from "../../components/admindashboarddevicetype";
import AdminDashboardStatusCount from "../../components/admindashboardstatuscount";
import { useStoreLogin } from "../../stores/store-login";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [numberOfStaff, setNumberOfStaff] = useState(0);
  const [numberOfProcessedOrders, setNumberOfProcessedOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [numUsers, setNumUsers] = useState([]);
  const [changed, setChanged] = useState(false);
  const { loggedUser, updateLoggedUser } = useStoreLogin();

  useEffect(() => {
    const fetchDataUrl = async (url) => {
      try {
        const res = await axios.get(url);
        const result = res.data;
        return result;
      } catch (error) {
        return [];
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

  if (Object.keys(loggedUser).length === 0) {
    return(<div></div>)
  } else {
    return (
      <div>
        <Navbar></Navbar>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        </div>
        <AdminDashboardUsersCount />
        <div className="divider"></div>
        <AdminDashboardStats
          numberOfStaff={numberOfStaff}
          numberOfUsers={numUsers}
          numberOfProcessedOrders={numberOfProcessedOrders}
        ></AdminDashboardStats>
        <AdminDashboardOrdersGraph />
        <div className="divider"></div>
        <div className="flex w-full">
          <div className="grid flex-grow  bg-base-300 rounded-box place-items-center">
            <h1>Last Five Orders</h1>
            <AdminDashboardTable
              orders={orders}
              changed={setChanged}
            ></AdminDashboardTable>
          </div>
          <div className="divider divider-horizontal"></div>

          <div className="">
            <div className="m-6">
              <AdminDashBoardDeviceType className="m-20" />
            </div>
            <div className="m-6">
              <AdminDashboardStatusCount className="m-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminDashboard;
