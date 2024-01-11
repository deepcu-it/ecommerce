import React, { useState, useEffect} from "react";
import{ FaShoppingCart  } from "react-icons/fa";
import { Carousel, Row, Col, Image, Button} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader.js"
import ProductReview from "./ProductReview.js"
import "./ProductReviews.css"
import ProductFeedback from "./ProductFeedback.js";
import { notify,ToastContainer } from "../notification.js";
const img1 = "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg";
const img2 = "https://images.unsplash.com/photo-1641638791220-e0346f44b074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&w=1000&q=80";


const ProductDetails = () => {
    const {id }= useParams();
    const [sizeOfWindow,setSizeOfWindow] = useState(window.innerWidth);
    const fixingWindowSize= () => setSizeOfWindow(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", fixingWindowSize);
    return () => {
      window.removeEventListener("resize", fixingWindowSize);
    };
  }, []);
    const btnSize = sizeOfWindow>800? "btn-lg" : sizeOfWindow>615? "btn-md" : "btn-sm";


    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state)=> state.productDetails);
    useEffect (() => {
     dispatch(getProductDetails(id))
    },[dispatch,id])
    return (
        <div style={{ position: "relative", paddingTop: "180px", paddingBottom: "20px", paddingLeft: "20px" }}>
          <Row>
            <Col>
              <Carousel controls indicators interval={3000}>
                <Carousel.Item>
                  <Image src={img1} className="d-block w-100 carousel-image" alt="Product Image" />
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={img2} className="d-block w-100 carousel-image" alt="Product Image" />
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={img1} className="d-block w-100 carousel-image" alt="Product Image" />
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col>
              {product ? ( // Check if product is available
                <>
                  <Row>
          {sizeOfWindow>800? <h2>{`$ ${product.name}`}</h2> :<h3>{product.name}</h3>}
                  </Row>
                  <Row>
                    <Col>
                      <ReactStars count={5} size={24} activeColor="#ffd700" />
                    </Col>
                    <Col>
                      <span> {`${product.reviewCount} Reviews`}</span>
                    </Col>
                  </Row>
                  <Row>
          {sizeOfWindow>800? <h2>{`$ ${product.price}`}</h2> :<h3>{`$ ${product.price}`}</h3>}
                  </Row>
                  <Row style={{ padding: "2%" }}>
                    <Col>
                      <Button onClick={()=>notify("Added Successfully")} variant="primary" className={btnSize}>
                        Add to Cart <span><FaShoppingCart /></span>
                      </Button>
                    </Col>
                    <Col>
                      <Button onClick={()=>notify("Added Successfully")} variant="primary" className={btnSize}>
                        Buy Now
                      </Button>
                    </Col>
                  </Row>
                  <Row style={{ padding: "2%", fontSize: "2vmax" }}>
                    <p>{product.description} </p>
                  </Row>
                </>
              ) : (
                // Render a loading state or a message when product is not available
                <Loader/>
              )}
            </Col>
          </Row>
          <br/>
           <ProductFeedback />
          <br/>
          <hr/>
          <Row>
            {product.reviews && product.reviews.length>0 ?
            <div className="Reviews">
              {product.reviews.map((review) => <ProductReview review={review}/>)}
            </div>
              :
              <div className="noReviews">
                <h3>No Reviews</h3>
              </div>
            }
          </Row>
          <ToastContainer/>

        </div>
      );
      
};
export default ProductDetails;