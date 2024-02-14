import React from "react";
import './ProductFilter.css'
const ProductFilter = () => {
    return (
        <div className="product-filter-height">
            <div className="filter-button"><a href="/products/mobile-accessories">Mobile Accessories</a></div>
            <div className="filter-button"><a href="/products/laptop">Laptop</a></div>
            <div className="filter-button"><a href="/products/hair-cream">Hair cream</a></div>
            <div className="filter-button"><a href="/products/Face-wash">Face Wash</a></div>
            <div className="filter-button"><a href="/products/product">Product</a></div>
            <div className="filter-button"><a href="/products/trolly-bag">Trolly bag</a></div>
        </div>
    )
};

export default ProductFilter;