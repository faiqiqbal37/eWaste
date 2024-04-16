import axios from "axios";
import React, { useEffect, useState } from "react";



const AdminDashboardUsersCount = () => {
  const [usersCount, setUsersCount] = useState({
    admin: 0,
    customers: 0,
    staff: 0,
  });
  const [totalUsers, setTotalUsers] = useState(0);

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
    
    let data = getReqUrl("http://127.0.0.1:5000/api/statistics/total_num_users_all").then(
        (user_count)=>{
            let temp = user_count
            setTotalUsers(temp['users'])
            delete temp.users
            setUsersCount(temp)
        }
    )

  }, []);

  return <div>
    
  </div>;
};

export default AdminDashboardUsersCount;
