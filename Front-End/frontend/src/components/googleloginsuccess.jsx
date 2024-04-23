import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreLogin } from '../stores/store-login';

const GoogleLoginSuccess = () => {
  const { orderId } = useParams();
  const [orderUpdatedBoolean, setOrderUpdatedBoolean] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const navigate = useNavigate();

  const { loggedUser, updateLoggedUser } = useStoreLogin();
  const [loginRole, setLoginRole] = useState(loggedUser.role);



  useEffect(() => {
    const getUser = async () => {
    if(!apiCalled){
        let reqDataFromEmail = await axios.get(`http://127.0.0.1:5000/api/users/email/${orderId}`)
        let data = reqDataFromEmail.data
  
        if (Object.keys(data).length > 0) {
          updateLoggedUser(data);
          setLoginRole(data.role);
        }
  
        setOrderUpdatedBoolean(true);
      };
    }

    getUser();

  }, [apiCalled]); 

  useEffect(() => {
    if (orderUpdatedBoolean) {
      navigate("/login");
    }
  }, [orderUpdatedBoolean, navigate]);

  return <div>Google success page</div>;
}

export default GoogleLoginSuccess;
