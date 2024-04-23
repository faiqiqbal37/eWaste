import axios from "axios";
import { useEffect, useState } from "react";
import AdminUserOrderBarChart from "./adminuserorderbarchart";

const AdminUserStatistics = ({ currentUser }) => {
  const [userStats, setUserStats] = useState({});

  const getUrl = async () => {
    try {
      let reqUserStats = await axios.get(
        `http://127.0.0.1:5000/api/statistics/user/${currentUser.user_id}`
      );
      let userStats = reqUserStats.data;
      return userStats;
    } catch (error) {
      return {};
    }
  };

  useEffect(() => {
    getUrl().then((data) => {
      if (Object.keys(data).length === 0) {
      } else {
        const mappedData = {
          "Average Amount": data.avg_amount.avg_amount,
          "Average Price": data.avg_price.avg_price,
          "Total Amount": data.total_amount.total_amount,
          "Total Device Classification Count":
            data.total_device_classification_count
              .total_device_classification_count,
          "Total Device Type Count":
            data.total_device_type_count.total_device_type_count,
          "Total Flagged Count": data.total_flagged_count.total_flagged_count,
          "Total Number of Orders": data.total_num_orders.total_num_orders,
          "User Device Status Count": data.user_device_status_count,
          "User Device Visibility Count": data.user_device_visibility_count,
          "Total Orders by Date": data.total_orders_by_date.map((order) => ({
            count: order.count,
            day: order.day,
            month: order.month,
            year: order.year,
          })),
        };
        setUserStats(mappedData);
      }
    });
  }, [currentUser]);

  return (
    <form method="dialog">
      {userStats && userStats["Total Orders by Date"] && (
        <AdminUserOrderBarChart orders={userStats["Total Orders by Date"]} />
      )}
      <button className="w-20 m-2 btn btn-error text-white">Close</button>
    </form>
  );
};

export default AdminUserStatistics;
