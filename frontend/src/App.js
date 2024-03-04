import './App.css';
import './components/layout/footer.css'
import './components/Home/Home.css'
import Header from "./components/layout/Header.js";
import Footer from './components/layout/footer.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js"
import AllProducts from './components/Product/AllProducts.js';
import Login from './components/user/login.js';
import SignUp from './components/user/signup.js';
import store from './store.js';
import { getUserDetails } from './actions/userAction.js';
import React from 'react';
import UserProfile from './components/user/UserProfile.js';
import ProtectedRoute from './components/Route/ProtectedRoute.js';
import UserUpdate from './components/user/userUpdate.js';
import UserUpdatePassword from "./components/user/UserUpdatePassword.js"
import ForgotPassword from './components/user/ForgotPassword.js';
import UserCart from './components/Shopping/Cart.js';
import Payment from './components/Shopping/payment.js';
import DeliveryAddress from './components/Shopping/DeliveryAddress.js';
import PaymentSuccess from './components/Shopping/PaymentSuccess.js';
import MyOrder from './components/Order/Myorder.js';
import AdminHome from './components/Admin/AdminHome.js';

function App() {
  React.useEffect(()=>{
    store.dispatch(getUserDetails());
  },[]);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path="/products" element={<AllProducts/>} />
        <Route       path="/products/:keyword" element={<AllProducts/>} />
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/forgot/password" element={<ForgotPassword/>}/>  
        <Route exact path ="/admin-route" element={<AdminHome/>}/>
      </Routes>
      <ProtectedRoute exact path="/account" component={UserProfile}/>
      <ProtectedRoute exact path="/account/orders" component={MyOrder}/>
      <ProtectedRoute exact path="/account/update" component={UserUpdate}/>
      <ProtectedRoute exact path="/account/update/password" component={UserUpdatePassword}/>
      <ProtectedRoute exact path="/me/cart" component={UserCart}/>
      <ProtectedRoute       path="/products/address/:id" component={DeliveryAddress}/>
      <ProtectedRoute       path="/products/payment/:id" component={Payment}/>
      <ProtectedRoute exact path="/products/payment/success/confirmation" component={PaymentSuccess}/>
      <Footer />
    </Router>
  );
}

export default App;
