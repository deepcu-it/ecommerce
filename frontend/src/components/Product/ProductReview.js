import React ,{useState,useEffect} from "react";
import { Row, Col, Button} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import "./ProductReviews.css";

const ProductReview = ({review}) =>{
   

    return (
        <div className="product-review">
            <Row>
              <h4>{review.name}</h4>
              <ReactStars count={5} value={review.rating} size={24} activeColor="#ffd700" />
            </Row>
            <Row>
                {review.comment}
            </Row>
        </div>
    )
}

export default ProductReview;