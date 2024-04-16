import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminBarChart from "./adminbarchart";




const AdminUserOrderBarChart = ({orders}) => {
  const [ordersByDate, setOrdersByDate] = useState(orders);

  
 

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
      <AdminBarChart statData={Object.keys(ordersByDate).length === 0 ? [{}]: returnDataDaysAndMonths()} />
    </div>
  )
};

export default AdminUserOrderBarChart;
