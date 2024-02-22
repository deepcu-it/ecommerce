import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../actions/cartAction";
import { notify } from "../notification";
import ReactStars from "react-rating-stars-component";
import { FaShoppingCart } from "react-icons/fa";
import "./cartComponent.css"; 
import { useNavigate } from "react-router-dom";

const CartComponent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img1= "https://i.pinimg.com/236x/dc/d4/0d/dcd40d9a7f9cf6a52e6cd4b2b93b15f6.jpg"
  const handleDeleteFromCart = () => {
    dispatch(removeFromCart(props.id));
    notify("Product Deleted from cart");
  };
  const {product} = useSelector((state) => state.productDetails);

  return (
    <div className="cart-card">
      <div className="cart-image-container">
        <img src={img1} alt={props.name} className="cart-image" />
      </div>
      <div className="cart-details">
        <div className="cart-info">
          <h3 className="cart-name">{props.name}</h3>
          <h3 className="cart-price">${props.price}</h3>
        </div>
        <p className="cart-description">{props.description}</p>
        <div className="cart-rating">
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={4} 
          />
          <span className="cart-review-count">{`${props.reviewCount} Reviews`}</span>
        </div>
        <div className="cart-buttons">
          <button className="cart-buy-now" onClick={() => {navigate(`/products/address/${props.id}`)}}>Buy Now</button>
          <button className="cart-remove" onClick={handleDeleteFromCart}>Remove from Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
