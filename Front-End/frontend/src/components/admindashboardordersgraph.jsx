import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminBarChart from "./adminbarchart";




const AdminDashboardOrdersGraph = () => {
  const [ordersByDate, setOrdersByDate] = useState([]);

  useEffect(() => {

    const getReqUrl = async (url) => {
        try {
          let data = await axios.get(url);
          let newData = data.data
          
          return newData;
        } catch (error) {
          return []
        }
      };
    
    let data = getReqUrl("http://127.0.0.1:5000/api/statistics/total_orders_by_date").then(
        (orders)=>{
            setOrdersByDate(orders)
        }
    )

  }, []);
  
 

  const transformDataDaysByYear = () => {
    if(ordersByDate.length === 0){
      return {}
    }
    else{
        const yearDictionary = {};

        ordersByDate.forEach(item => {
          const year = item.year;
          if (!yearDictionary[year]) {
            yearDictionary[year] = [];
          }
          yearDictionary[year].push(item);
    
        });
    
        return yearDictionary
    }

  }

  const transformDataMonthsByYear = () => {
    if(ordersByDate.length === 0){
        return {}
    }
    else{
        const yearMonthDictionary = {};

        ordersByDate.forEach(item => {
            const year = item.year;
            const month = item.month;
            if (!yearMonthDictionary[year]) {
              yearMonthDictionary[year] = {};
            }
            if (!yearMonthDictionary[year][month]) {
              yearMonthDictionary[year][month] = 0;
            }
            yearMonthDictionary[year][month] += item.count;
    
          });
    
        return yearMonthDictionary
    }

  }

  const returnDataDaysAndMonths = () => {
    let data_dict = {};
    data_dict['days'] = transformDataDaysByYear();
    data_dict['months'] = transformDataMonthsByYear();
    return data_dict;
  };

  return(
    <div className="m-auto p-5">
      <AdminBarChart statData={returnDataDaysAndMonths()} />
    </div>
  )
};

export default AdminDashboardOrdersGraph;
