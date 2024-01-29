import React, {useState,useEffect} from "react";
import "./UserUpdatePassword.css";
import {useDispatch,useSelector} from "react-redux";
import {notify,ToastContainer} from "../notification.js";
import { Button } from "react-bootstrap";
import { clearErrors,updatePassword } from "../../actions/userAction.js";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../consents/userConsent.js";
const UserUpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customButton = {
        width:"170px",
        margin:"15px",
        padding:"10px",
        textAlign:"center",
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(newPassword !== confirmPassword) notify("password does not matched");
        else dispatch(updatePassword(oldPassword,newPassword,confirmPassword));

    }
    const {error,isUpdated} = useSelector((state)=>state.UpdatedUser);
    useEffect(()=>{
        if(error) {
            notify(error);
            dispatch(clearErrors);
        }
        if(isUpdated) {
            notify("Profile Updated successfully");
            navigate("/account");
            dispatch({ type:UPDATE_PASSWORD_RESET })
        }
    },[dispatch,error,isUpdated]);
    return (
        <div>
            <div style={{height:"100px"}}></div>
            <div className="content-passwordchange">
                <div className="content-segment">
                    <label>
                        <div>Enter Old Password:</div>
                        <div><input onChange={(e)=>setOldPassword(e.target.value)} className="input" type="text"  placeholder="Enter Old Password"/></div>
                    </label>
                    <label>
                        <div>Enter New Password:</div>
                        <div><input onChange={(e)=>setNewPassword(e.target.value)} type="text"  className="input" placeholder="New Password"/></div>
                    </label>
                    <label>
                        <div>Enter Confirm Password:</div>
                        <div><input onChange={(e)=>setConfirmPassword(e.target.value)} type="text" className="input" placeholder="Confirm Password"/></div>
                    </label>
                    <Button onClick={handleSubmit} style={customButton}> Update</Button>
                    <ToastContainer/>
                </div>
            </div>
            <div style={{height:"60px"}}></div>
        </div>
    )
}
export default UserUpdatePassword;