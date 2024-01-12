import react from "react";
import "./userProfile.css"
import {Button, Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader.js";
const img1 = "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg";

const UserProfile = ()=> {
    const {loading,user,error,isAuthenticated} = useSelector((state)=>state.user);
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
                <Button style={customButton}>Edit Profile</Button>
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
            <Button style={customButton}>My Orders</Button>
            
            <Button style={customButton}>Change Password</Button>
            </Col>
            <div style={{height:"100px"}}></div>
        </Row>
    )
}

export default UserProfile;