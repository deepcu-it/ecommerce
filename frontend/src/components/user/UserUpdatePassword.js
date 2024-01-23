import React, {useState,useEffect} from "react";
import "./UserUpdatePassword.css";
import {useDispatch,useSelector} from "react-redux";
import {notify,ToastContainer} from "../notification.js";
const UserUpdatePassword = () => {
    return (
        <div>
            <div style={{height:"100px"}}></div>
            <div className="content-passwordchange">
                <div className="content-segment">
                    <label>
                        <div>Enter Old Password:</div>
                        <div><input className="input" type="text"  placeholder="Enter Old Password"/></div>
                    </label>
                    <label>
                        <div>Enter New Password:</div>
                        <div><input type="text"  className="input" placeholder="New Password"/></div>
                    </label>
                    <label>
                        <div>Enter Confirm Password:</div>
                        <div><input type="text" className="input" placeholder="Confirm Password"/></div>
                    </label>
                </div>
            </div>
            <div style={{height:"60px"}}></div>
        </div>
    )
}
export default UserUpdatePassword;