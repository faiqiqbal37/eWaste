import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GoogleLoginSuccess = () => {
  const { orderId } = useParams();
  const [orderUpdatedBoolean, setOrderUpdatedBoolean] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      axios.get("http://127.0.0.1")

      if (!apiCalled) {
        console.log(apiCalled);

        setApiCalled(true);
      }

      setOrderUpdatedBoolean(true);
    };

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
