import axios from "axios";
import React, { useState, useEffect } from "react";
import AdminFinanceCollapseComponent from "../../components/adminfinancecollapse";
import AdminFinanceStats from "../../components/adminfinancestats";

const fetchUrl = async (url) => {
  try {
    let reqData = await axios.get(url);
    let data = reqData.data;
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
};

const AdminFinance = () => {
  const [orderData, setOrderData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [finalObjects, setFinalObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [costPerService, setCostPerService] = useState(0);

  useEffect(() => {
    const promiseReturn = async (urlReq) => {
      let arr = [];
      await Promise.all(urlReq.map((el) => fetchUrl(el))).then((values) => {
        setOrderData(values[0]);
        setServiceData(values[1]);
      });
    };

    let baseUrl = "http://127.0.0.1:5000";
    let urlReq = ["/api/orders", "/api/service"];
    urlReq = urlReq.map((el) => baseUrl + el);
    promiseReturn(urlReq);

    fetchUrl("http://127.0.0.1:5000/api/service_cost").then((el) =>
      setCostPerService(el)
    );
  }, []);

  useEffect(() => {
    let filteredServices = serviceData
      .filter((el) => (el["service_name"] && el["service_name"].includes("Data Retrieval")))
      .map((el) => el["service_id"]);
    let filteredOrders = orderData.filter((el) =>
      el["service_id"] && filteredServices.includes(el["service_id"])
    );

    let mergedData = filteredOrders.map((order) => {
      let service = serviceData.find(
        (service) => service.service_id === order.service_id
      );
      return { ...order, service };
    });

    setFilteredOrders(mergedData);
  }, [orderData, serviceData]);

  useEffect(() => {
    let baseUrl = "http://127.0.0.1:5000";
    let urlReq = ["/api/users/", "/api/devices/"];
    urlReq = urlReq.map((el) => baseUrl + el);

    Promise.all(
      filteredOrders.map(async (el) => {
        let filteredMergedOrders = el;
        await fetchUrl(urlReq[0] + el["user_id"]).then((el) => {
          filteredMergedOrders = { ...filteredMergedOrders, ...el };
        });
        await fetchUrl(urlReq[1] + el["device_id"]).then((el) => {
          filteredMergedOrders = { ...filteredMergedOrders, ...el };
        });
        return filteredMergedOrders;
      })
    ).then((val) => {
      if (val.length === 0) {
        setFinalObjects([]);
      } else {
        val = val.map((el) => {
          return { ...el, date: new Date(el["date"]) };
        });
        val = val.sort((a, b) => a.date - b.date);

        let arr = [];
        let currDate = val[0].date;
        let group = [];

        for (const el of val) {
          if (el.date.getTime() !== currDate.getTime()) {
            arr.push({ date: currDate, group: group });
            group = [el];
            currDate = el.date;
          } else {
            group.push(el);
          }
        }
        arr.push({ date: currDate, group: group });

        setFinalObjects(arr);
      }
    });
  }, [filteredOrders]);

  useEffect(() => {
    console.log(finalObjects);
    setIsLoading(false);
  }, [finalObjects]);

  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h1 className="text-2xl font-bold ml-auto mr-auto mb-4 mt-4">
            Admin Finances
          </h1>
        </div>
        <div>
          {finalObjects.map((el, index) => {
            return (
              <div className="ml-5 mr-5">
                <h1>
                  Orders on:{" "}
                  {el["date"].getUTCDate() +
                    "/" +
                    (parseInt(el["date"].getUTCMonth()) + 1) +
                    "/" +
                    el["date"].getUTCFullYear()}
                </h1>
                <div className="divider"></div>
                <AdminFinanceStats data={el['group']} amount={costPerService}></AdminFinanceStats>
                <AdminFinanceCollapseComponent
                  data={el["group"]}
                  amount={costPerService}
                />
                <div className="divider"></div>
              </div>
            );
          })}
        </div>
        <div className="mb-5">
          <div className="divider"></div>
          <div className="flex justify-between text-xl font-medium">
            <div className="ml-3">Total:</div>
            <div className="mr-3">{costPerService * filteredOrders.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
