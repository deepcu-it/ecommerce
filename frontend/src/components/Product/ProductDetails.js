import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader.js";
import ReactStars from "react-rating-stars-component";
import ProductReview from "./ProductReview.js";
import ProductFeedback from "./ProductFeedback.js";
import { notify, ToastContainer } from "../notification.js";
import { addToCart } from "../../actions/cartAction.js";
import "./ProductDetails.css";

const img1 = "https://i.pinimg.com/236x/dc/d4/0d/dcd40d9a7f9cf6a52e6cd4b2b93b15f6.jpg";
const img2 = "https://5.imimg.com/data5/SELLER/Default/2021/7/ZW/DY/RA/133215290/mens-wear.jpg";
const img3 = "https://www.realmenrealstyle.com/wp-content/uploads/2023/09/man-dress-for-age.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [sizeOfWindow, setSizeOfWindow] = useState(window.innerWidth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fixingWindowSize = () => setSizeOfWindow(window.innerWidth);
    window.addEventListener("resize", fixingWindowSize);
    return () => {
      window.removeEventListener("resize", fixingWindowSize);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(intervalId);
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

  return (
    <div className="product-details-container">
      <div className="height1"></div>
      <div className="product-image-container">
      <div className="carousel-container">
        <img src={currentImageIndex === 0 ? img1 : currentImageIndex === 1 ? img2 : img3} className="carousel-image" alt="Product Image" />
      </div>
      <div className="product-info-container">
        {product ? (
          <>
            <h2 className="product-name">{product.name}</h2>
            <div className="product-rating">
              <ReactStars count={5} size={24} activeColor="#ffd700" value={4} />
              <span className="review-count">{`${product.reviewCount} Reviews`}</span>
            </div>
            <h3 className="product-price">${product.price}</h3>
            <div className="buttons-container">
              <button onClick={handleAddToCart} className={`add-to-cart-button ${btnSize}`}>
                Add to Cart <span><FaShoppingCart /></span>
              </button>
              <button onClick={() => notify("Added Successfully")} className={`buy-now-button ${btnSize}`}>
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
