import react ,{useEffect,useState}from "react";
import "./userUpdate.css"
import {Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import Loader from "../layout/Loader.js";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, updateProfile } from "../../actions/userAction.js";
import { notify,ToastContainer } from "../notification.js";
import { UPDATE_USER_RESET } from "../../consents/userConsent.js";


const img1 = "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg";

const UserUpdate = ()=> {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    
    const {loading,user,isAuthenticated} = useSelector((state)=>state.user);
    const {error,isUpdated} = useSelector((state)=>state.UpdatedUser);


    const [fullName, setFullName] = useState(user && user.name);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNo);
    const [newEmail, setnewEmail] = useState(user && user.email);
    const [password,setPassword] = useState('');
    const oldEmail = user && user.email;
   
    useEffect(()=>{
        if(error) {
            notify(error);
            dispatch(clearErrors);
        }
        if(isUpdated){
            notify("Profile Updated Successfully");
            navigate("/account");
            dispatch({type:UPDATE_USER_RESET});
        }
    },[dispatch,isUpdated,error]);
    const handleSubmit = (e)=> {
        e.preventDefault();
        dispatch(updateProfile(fullName,phoneNumber,newEmail,oldEmail,password));
    }
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
            <ToastContainer/>
            </Col>
            <div style={{height:"100px"}}></div>
        </Row>
    )
}

export default UserUpdate;

