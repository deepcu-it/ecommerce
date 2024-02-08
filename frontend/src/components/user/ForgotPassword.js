import React, { useEffect, useState } from 'react';
import "./ForgotPassword.css";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, forgetPassword } from '../../actions/userAction';
import { notify,ToastContainer } from '../notification';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp,setotp] = useState('');
  const [isCliked,setIsCliked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const customButton = {
    width:"170px",
    margin:"15px",
    padding:"10px",
  }
  const handleClick = (e) => {
      e.preventDefault();
      dispatch(forgetPassword(email));
  }

  //otp intregation here
  const {loading,error,isForgotted} = useSelector((state) => state.forgotPassword);
  useEffect(()=>{
    if(error) {
      notify(error);
      dispatch(clearErrors());
    }
    if(isForgotted) {
      setIsCliked(true);
    }
     
  },[dispatch,error,isForgotted])
  return (
        <div>
            <div className='height'></div>
            <div className="forgot-password-container">
                <form className="forgot-password2">
                    <div><h2>Forgot Password</h2></div>
                    <div className='user'>
                        <div>Email</div>
                        <input type="email" className='input' placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {isCliked && <div className='user'>
                        <div>OTP</div>
                        <input type="text" placeholder="Enter OTP" className='input' required value={otp} onChange={(e) => setotp(e.target.value)} />
                    </div>}
                    <div>
                    <Button onClick={handleClick} style={customButton}>{isCliked ? "Verify OTP" : "Send OTP"}</Button>
                    </div>
                </form>
            </div>
            <div className='height'></div>
            <ToastContainer/>
        </div>
  );
};

export default ForgotPassword;
