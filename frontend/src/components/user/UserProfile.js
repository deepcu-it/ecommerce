import react, { useEffect } from "react";
import "./userProfile.css"
import {Button, Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { notify,ToastContainer } from "../notification.js";
import Loader from "../layout/Loader.js";
import { Link } from "react-router-dom";
const img1 = "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg";

const UserProfile = ()=> {
    const {loading,user,isAuthenticated} = useSelector((state)=>state.user);
    
    const customImage = {
        borderRadius:"50%",
        margin:"20px",
        height:"200px",
        width:"200px",
    }
    const customButton = {
        width:"170px",
        margin:"15px",
        padding:"10px",
    }
    const customCol = {
        textAlign:"center",
    }
    const customCol2 = {
        padding:"30px"
    }
    return (
        loading ? 
            <Loader/>
                : 
                <Row>
            <div style={{height:"100px"}}></div>
            <h1 className="page-title">My Profile</h1>
            <Col style={customCol}>
                <div><img src={img1} className="user-image" /></div>
                <Link to={"/account/update"}><Button style={customButton}>Edit Profile</Button></Link>
            </Col>
            <Col style={customCol2}>
            <div className="user">
                <div>Full Name:</div>
                <div>{ user && user.name}</div>
            </div>
            <div className="user">
                <div>Delivery No:</div>
                <div>{ user && user.phoneNo}</div>
            </div>
            <div className="user">
                <div>Delivery Email:</div>
                <div>{ user && user.email}</div>
            </div>
            <Link to={"/account/orders"}><Button style={customButton}>My Orders</Button></Link>
            <Link to={"/account/update/password"}><Button style={customButton}>Change Password</Button></Link>
            </Col>
            <div style={{height:"100px"}}></div>
            <ToastContainer/>
        </Row>
    )
}

export default UserProfile;