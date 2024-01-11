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
        <Route path="/products/:keyword" element={<AllProducts/>} />
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
