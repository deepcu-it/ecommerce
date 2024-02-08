import React, { useState } from 'react';
import { Card, CardImg, CardTitle, CardText, Button, Row, Col } from 'react-bootstrap';
import{ FaShoppingCart  }from "react-icons/fa";
import "./product.css";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const customStyle= {
  maxWidth: '350px', 
  maxHeight: '200px',
  borderRadius:'1px',
}

const Product = (props) => {
  const [isMouseHovered,setMouseHovered]=useState(false);
  const ChangeMouseOver=() => {
    setMouseHovered(true);
  };
  const ChangeMouseOut=() => {
    setMouseHovered(false);
  };
  const cardStyle = {
    boxShadow: isMouseHovered ? '0 14px 16px rgba(0, 0, 0, 0.2), 0 12px 14px rgba(0, 0, 0, 0.16)' : 'none',
    animation : 'scale-slide 1.3s ease-out both',
    transition:'box-shadow 0.3s ease-in',
  };
  return (
    <Card onMouseOver={ChangeMouseOver}
          onMouseOut={ChangeMouseOut}
          style={{...cardStyle,margin:"1.25vw"}}
    >
      <Col>
        <Link to={`/product/${props.P_id}`}>
          <Row style={ {height:"200px",width:"350px",padding:"2%"}}>
            <CardImg style={ customStyle }  src={props.images} alt={props.name} />
          </Row>
        </Link>
        <Row style={{padding:"2%",fontSize:"25px"}}>
          <Col>
          <CardText>{props.name}</CardText>
          </Col>
          <Col>
          <CardText>${props.price}</CardText>
          </Col>

        </Row>
        <Row style={{padding:"2%"}}>
          <CardTitle>{props.description}</CardTitle>
        </Row>
        <Row style={{padding:"2%"}}>
          <Col>
          <ReactStars 
           count={5}
           //onChange={ratingChanged}
           size={24}
           activeColor="#ffd700"
           value={props.rating}
          />
          </Col>
          <Col>
            <span> {`${props.reviewCount} Reviews`}</span>
          </Col>
        </Row>
        <Row style={{padding:"2%"}}>
          <Col>
            <Button variant="primary">Add to Cart <span><FaShoppingCart /></span></Button>
          </Col>
          <Col>
            <Button variant="primary">Buy Now</Button>
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default Product;