import React from "react";
import { Card, CardImg, CardTitle, CardText, Button, Row, Col } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { FaShoppingCart } from "react-icons/fa";

const CartComponent = (props) => {
    return (
        <Card style={{marginBottom:"1.25vw"}}>
          <Col>
              <Row style={ {height:"200px",width:"350px",padding:"2%"}}>
                <CardImg  src={props.images} alt={props.name} />
              </Row>
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
               size={24}
               activeColor="#ffd700"
                value={4}
              />
              </Col>
              <Col>
                <span> {`${props.reviewCount} Reviews`}</span>
              </Col>
            </Row>
            <Row style={{padding:"2%"}}>
                <Button style={{width:"100%",fontSize:"20px",padding:"2%"}} variant="primary">Buy Now</Button>
            </Row>
          </Col>
        </Card>
      );
    };
    
export default CartComponent