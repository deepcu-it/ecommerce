import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./product.js";
import Row from 'react-bootstrap/Row';
import { getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader.js"
const customStyle = {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#574c94"
};

function Home() {
    const dispatch = useDispatch();
    const { loading, error, products,productCount} = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="banner">
                <p>Welcome to SASWATI ENTERPRISE</p>
                <h1>FIND PRODUCT BEYOND YOUR THOUGHT</h1>
                <a href="/products">
                    <button className="explore-btn">
                        Explore Now
                    </button>
                </a>
            </div>

            <Row style={customStyle}>
                {loading ? (
                    <Loader/>
                ) : error ? (
                    "Error loading products"
                ) : products.length > 0 ? (
                    products.map(product => (
                        <Product
                            key={product._id} // Assuming each product has a unique identifier
                            P_id={product._id}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            image={product.images}
                            rating={product.rating}
                            reviewCount={product.reviews.length}
                        />
                    ))
                ) : (
                    "No products to display"
                )}
            </Row>
        </React.Fragment>
    );
}

export default Home;
