import React, { useState } from 'react';
import "./ForgotPassword.css";
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { forgotPassword } from '../../actions/userAction';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp,setotp] = useState('');
  const [isCliked,setIsCliked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
   // dispatch(forgotPassword(email));
    navigate('/password-reset-sent');
  };
  const customButton = {
    width:"170px",
    margin:"15px",
    padding:"10px",
  }
  const handleClick = () => {
      setIsCliked(true);
  }
  return (
        <div>
            <div className='height'></div>
            <div className="forgot-password-container">
                <form onSubmit={submitHandler}>
                    <div><h2>Forgot Password</h2></div>
                    <div className='user'>
                        <div>Email</div>
                        <input type="email" className='input' placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {isCliked && <div className='user'>
                        <div>OTP</div>
                        <input type="text" placeholder="Enter OTP" className='input' required value={otp} onChange={(e) => setotp(e.target.value)} />
                    </div>}
                    <Button onClick={handleClick} style={customButton}>Make Changes</Button>
                </form>
            </div>
            <div className='height'></div>
        </div>
  );
};

export default ForgotPassword;
