import "./AdminProduct.css"
import react, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";


const AdminGetAllProducts = () => {
    return (
        <div className="admin-product-details-container">
            <div className="admin-product-image-container">
                <img className="admin-product-image" src="https://i.pinimg.com/236x/dc/d4/0d/dcd40d9a7f9cf6a52e6cd4b2b93b15f6.jpg" alt="product" />
            </div>
            <div >
                <div className="admin-product-details-heading">
                    <h2>Product Name</h2>
                    <h3>$ 200</h3>
                </div>
                <div>
                    <ReactStars
                        count={5}
                        size={24}
                        color2={'#ffd700'}
                        value={0}
                    />
                </div>
                <div className="admin-product-description">
                    <p>Product Description Description Description Description Description Description DescriptionD  escriptionD escription Description</p>
                </div>
                <div ><Link><Button style={{ width: "100%", marginBottom: "10px" }}>Update</Button></Link></div>
                <div ><Link><Button style={{ width: "100%" }}>Delete</Button></Link></div>
            </div>
        </div>
    )
}

export default AdminGetAllProducts