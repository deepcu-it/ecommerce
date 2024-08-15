import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartAction';
import {Button} from 'react-bootstrap'
import { ToastContainer, notify } from '../notification';
import "./product.css"; 

const Product = (props) => {
  const [isMouseHovered, setMouseHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const quantity = 1;
    dispatch(addToCart(props.P_id, quantity));
    notify("Added to cart");
  };

  return (
    <div
      onMouseOver={() => setMouseHovered(true)}
      onMouseOut={() => setMouseHovered(false)}
      className="product-card" 
    >
      <Link to={`/product/${props.P_id}`}>
        <img className="product-image" src={props.image.url} alt={props.name} />
      </Link>
      <div style={{ padding: '10px' }}>
        <div className="product-info">
          <h3>{props.name}</h3>
          <h3>{props.price}</h3>
        </div>
        <p>{props.description}</p>
        <div className="product-rating">
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={props.rating}
          />
          <span style={{ marginLeft: '15px' }}>{`${props.reviewCount} Reviews`}</span>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => handleAddToCart()} style={{ marginRight: '15px' }}>Add to Cart</Button>
          <Button href={`/products/address/${props.P_id}`}>Buy Now</Button>
        </div>
      </div>
      
    </div>
  );
};

export default Product;
