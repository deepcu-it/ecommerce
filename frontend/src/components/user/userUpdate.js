import react ,{useEffect,useState}from "react";
import "./userUpdate.css"
import {Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import Loader from "../layout/Loader.js";
import { Link, useNavigate } from "react-router-dom";
import { notify,ToastContainer } from "../notification.js";
import { clearErrors, updateProfile } from "../../actions/userAction.js";

const img1 = "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg";

const UserUpdate = ()=> {
    const {loading,user,} = useSelector((state)=>state.user);
    const [fullName, setFullName] = useState(user.name);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNo);
    const [newEmail, setnewEmail] = useState(user.email);
    const [password,setPassword] = useState('');
    const oldEmail = user.email;
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const handleSubmit = ()=> {
        dispatch(updateProfile(fullName,phoneNumber,newEmail,oldEmail,password));
    }
    const {error,isUpdated} = useSelector((state)=>state.UpdatedUser);
    useEffect(()=>{
        if(error) {
            notify(error);
            dispatch(clearErrors);
        }
       if(isUpdated){
         notify("Profile Updated Succesfully");
        navigate("/account");
    }
    },[dispatch,isUpdated,error]);
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
                <Link to={"/account"}><Button style={customButton}>Go to Profile</Button></Link>
            </Col>
            <Col style={customCol2}>
            <div className="user">
                <div>Full Name:</div>
                <div><input onChange={(e)=>setFullName(e.target.value)} className="input" type="text" placeholder="Enter name"/></div>
            </div>
            <div className="user">
                <div>Delivery No:</div>
                <div><input  onChange={(e)=>setPhoneNumber(e.target.value)} className="input" type="text" placeholder="Enter phone no"/></div>
            </div>
            <div className="user">
                <div>Delivery Email:</div>
                <div><input className="input"  onChange={(e)=>setnewEmail(e.target.value)} type="text" placeholder="Enter email"/></div>
            </div>
            <div className="user">
                <div>Enter Password:</div>
                <div><input className="input"  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter password"/></div>
            </div>
            <Button onClick={handleSubmit} style={customButton}>Make Changes</Button>
            </Col>
            <div style={{height:"100px"}}></div>
        </Row>
    )
}

export default UserUpdate;

