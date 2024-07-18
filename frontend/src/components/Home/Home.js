// Home.js

import React, { Fragment, useEffect, useState } from "react";
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
    backgroundColor: "#1b1b1b"
};

function Home() {
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector((state) => state.products);
    const [bannerText, setBannerText] = useState("");
    const bannerTitles = [
        "PRODUCT BEYOND THOUGHT",
        "DISCOVER AMAZING DEALS",
        "COLLECTION UNIQUE ITEMS",
        "TRENDING OFFERS FOR YOU",
        "TRENDING OFFERS RECENT",
    ];

    useEffect(() => {
        dispatch(getProduct());
        animateBannerTitles();
    }, [dispatch]);

    const animateBannerTitles = () => {
        let index = 0;
        setInterval(() => {
            setBannerText(bannerTitles[index]);
            index = (index + 1) % bannerTitles.length;
        }, 6000);
  
    };

    return (
        <React.Fragment>
            <div className="banner">
                <p>Welcome to SASWATI ENTERPRISE</p>
                <h1>{bannerText}</h1>
            </div>

            <Row style={customStyle}>
                {loading ? (
                    <Loader />
                ) : error ? (
                    "Error loading products"
                ) : products.length > 0 ? (
                    products.map(product => (
                        <Product
                            key={product._id}
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
