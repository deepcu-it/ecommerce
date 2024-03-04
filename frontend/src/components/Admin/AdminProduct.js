import React from "react"
import "./AdminProduct.css"
import AdminGetAllProducts from "./AdminGetAllProducts"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"


const AdminProduct = ()=>{

    return(
        <div className="admin-product-container">
            <h1>Products</h1>
            <Link><Button>Create a New Product</Button></Link>
            <AdminGetAllProducts/>
            <AdminGetAllProducts/>

        </div>
    )
}

export default AdminProduct