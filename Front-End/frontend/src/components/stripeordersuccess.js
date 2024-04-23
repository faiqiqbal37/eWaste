import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [orderUpdatedBoolean, setOrderUpdatedBoolean] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!apiCalled) {
        console.log(apiCalled);

        setApiCalled(true);
      }

      setOrderUpdatedBoolean(true);
    };

    delay();

  }, [apiCalled]); 

  useEffect(() => {
    if (orderUpdatedBoolean) {
      navigate("/login");
    }
  }, [orderUpdatedBoolean, navigate]);

  return <div>Order success page</div>;
}

export default OrderSuccess;
