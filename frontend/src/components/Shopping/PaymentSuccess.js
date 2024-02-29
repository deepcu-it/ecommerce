import React from 'react';
import './PaymentSuccess.css'; 
import { AiFillCheckCircle } from "react-icons/ai";
import {useNavigate} from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate= useNavigate();
  return (
    <div>
        <div className='height2'></div>
        <div className="payment-success-container">
            <div className="payment-success-content">
                <AiFillCheckCircle style={{height:"75px",width:"75px"}}/>
                <p>Payment Successful</p>
                <button onClick={()=> navigate("/account/orders")} className="input" >View Order</button>
            </div>
        </div>
    </div>
  );
};

export default PaymentSuccess;
