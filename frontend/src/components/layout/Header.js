import React,{ useRef,useState,useEffect} from "react";
import {FaBars,FaTimes} from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "../../actions/userAction.js";
import {notify, ToastContainer} from "../notification.js";
import {useNavigate} from "react-router-dom";

function Header() {
  const navref=useRef();
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const showNavbar =()=>{
    navref.current.classList.toggle("responsive_nav");
  }
  const logoutSubmit = ()=> {
    dispatch(logoutUser());
    notify("logged out successfully");
    navigate("/");
  }
  const gotoLogin= () => {
    navigate("/login");
  }
  const customDownLine = {
    height:"30px",
    width:"30px",
  }
  const {loading,error,user,isAuthenticated} = useSelector((state)=> state.user);
  const [loginToggle,setLoginToggle ]= useState("login");
  useEffect(()=>{
    if(isAuthenticated) setLoginToggle("logout");
  },[isAuthenticated]);
  return (
      <React.Fragment>
        <header>
          <div className="company-name">
            <h3><a className="company-name-link" href="/"> SASWATI</a></h3>
          </div>
          <div className="company-navbar">
            <nav ref={navref}>
              <a href="/" >Home<span><RiArrowDropDownLine style={customDownLine}/></span></a>
              <a href="/products" >Products <span><RiArrowDropDownLine style={customDownLine}/></span></a>
              <a href="/about" >About Us <span><RiArrowDropDownLine style={customDownLine}/></span></a>
              <a onClick={isAuthenticated ? logoutSubmit :gotoLogin}>{loginToggle}<span><TbLogout style={{cursor:"pointer",height:"23px",width:"27px"}}/></span></a>
              <a href="/account"><img src="" className="user-profile"/></a>
            
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes/>
              </button>
            </nav>
          <button className="nav-btn" onClick={showNavbar}>
              <FaBars/>
          </button>
        </div>
        </header>
        <ToastContainer/>
      </React.Fragment>
    );
}

export default Header;