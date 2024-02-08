import React from "react";
import CartComponent from "./CartComponent";
import { Row } from "react-bootstrap";
const UserCart = () => {
  return (
    <div>
        <div className="height1"></div>
        <Row style={{justifyContent:"center",alignItems:"center",gap:"20px"}}>
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
        </Row>
        <div classname="height1"></div>
    </div>
  );
};

export default UserCart;