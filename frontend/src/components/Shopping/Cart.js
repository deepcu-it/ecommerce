import React from "react";
import CartComponent from "./CartComponent.js";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
const UserCart = () => {
  const {cartItems} = useSelector((state) => state.cart);
  return (
    <div>
        <div className="height1"></div>
        <Row style={{justifyContent:"center",alignItems:"center",gap:"20px"}}>
             {cartItems.length>0 ? cartItems.map((Item)=>(
              <CartComponent 
                key={Item.product}
                id={Item.product}
                name={Item.name}
                price={Item.price}
                description={Item.description}
                image={Item.image}
                reviewCount={Item.numofreview}
                stock={Item.stock}
              />
              
            )) : <h2 style={{textAlign:"center"}}>Cart is Empty</h2>} 
        </Row>
        <div classname="height1"></div>
    </div>
  );
};

export default UserCart;