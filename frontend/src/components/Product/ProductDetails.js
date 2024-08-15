import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {  useParams, useNavigate } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader.js";
import ReactStars from "react-rating-stars-component";
import ProductReview from "./ProductReview.js";
import ProductFeedback from "./ProductFeedback.js";
import { notify, ToastContainer } from "../notification.js";
import { addToCart } from "../../actions/cartAction.js";
import "./ProductDetails.css";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sizeOfWindow, setSizeOfWindow] = useState(window.innerWidth);

  useEffect(() => {
    const fixingWindowSize = () => setSizeOfWindow(window.innerWidth);
    window.addEventListener("resize", fixingWindowSize);
    return () => {
      window.removeEventListener("resize", fixingWindowSize);
    };
  }, []);

  const btnSize = sizeOfWindow > 800 ? "btn-lg" : sizeOfWindow > 615 ? "btn-md" : "btn-sm";

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    const quantity = 1;
    dispatch(addToCart(product._id, quantity));
    notify("Added to Cart");
  };
  const handleBuyNow = () => {
    navigate(`/products/address/${product._id}`);
  }

  return (
    <div className="product-details-container">
      <div className="height1"></div>
      <div className="product-image-container">
      <div className="carousel-container">
        <img src={product.images && product.images.url} className="carousel-image" alt="Product Image" />
      </div>
      <div className="product-info-container">
        {!loading ? (
          <>
            <div className="product-name-price">
              <h2 className="product-name">{product.name}</h2>
              <h2 className="product-price">${product.price}</h2> 
            </div>
            <div className="product-rating">
              <ReactStars count={5} size={24} activeColor="#ffd700" value={4} />
              <span className="review-count">{`${product.numofreviews} Reviews`}</span>
            </div>
            <div className="buttons-container">
              <button onClick={handleAddToCart} className={`add-to-cart-button`}>
                Add to Cart <span><FaShoppingCart /></span>
              </button>
              <button onClick={handleBuyNow} className={`buy-now-button`}>
                Buy Now
              </button>
            </div>
            <p className="product-description">{product.description}</p>
          </>
        ) : (
          <Loader />
        )}
      </div>
      </div>
      <ProductFeedback />
      <hr />
      <div className="reviews-container">
        {product && product.reviews && product.reviews.length > 0 ? (
          <div className="reviews">
            {product.reviews.map((review) => <ProductReview key={review.id} review={review} />)}
          </div>
        ) : (
          <div className="no-reviews">
            <h3>No Reviews</h3>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
