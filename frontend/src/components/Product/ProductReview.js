import React ,{useState,useEffect} from "react";
import { Row, Col, Button} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import "./ProductReviews.css";

const ProductReview = ({review}) =>{
    const [sizeOfWindow,setSizeOfWindow] = useState(window.innerWidth);
    const fixingWindowSize= () => setSizeOfWindow(window.innerWidth);

    
  useEffect(() => {
    window.addEventListener("resize", fixingWindowSize);
    return () => {
      window.removeEventListener("resize", fixingWindowSize);
    };
  }, []);
    return (
        <div className="product-review">
            <Row>
          <img className="product-review-image" alt="userProfile"/>
          {sizeOfWindow>800? <h3>{review.name}</h3> :<h4>{review.name}</h4>}    
                {/* Add like button*/}
            </Row>
            <Row>
                {review.comment}
            </Row>
            <Row>
                <ReactStars count={5} value={review.rating} size={24} activeColor="#ffd700" />
            </Row>
        </div>
    )
}

export default ProductReview;