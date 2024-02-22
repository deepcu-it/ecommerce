import React from 'react';
import './PaymentSuccess.css'; 
import { AiFillCheckCircle } from "react-icons/ai";

const PaymentSuccess = () => {
  return (
    <div>
        <div className='height2'></div>
        <div className="payment-success-container">
            <div className="payment-success-content">
                <AiFillCheckCircle style={{height:"75px",width:"75px"}}/>
                <p>Payment Successful</p>
            </div>
        </div>
    </div>
  );
};

export default PaymentSuccess;
