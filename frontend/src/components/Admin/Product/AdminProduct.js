import React, { useEffect } from "react"
import "./AdminProduct.css"
import AdminGetAllProducts from "./AdminGetAllProducts"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from "../../../actions/productAction"
import Loader from "../../layout/Loader"
const AdminProduct = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProduct());
        
    },[dispatch]);
    const {loading, products } = useSelector((state)=>state.products)
    return(
        loading ? <Loader/> :<div className="admin-product-container">
            <h1>Products</h1>
            <Link to="/admin-route/product/create"><Button>Create a New Product</Button></Link>
            {products && products.map((product)=>(
                <AdminGetAllProducts 
                    key={product._id}
                    p_id={product._id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    rating={product.rating}

                />
            ))}
        </div>
    )
}

export default AdminProduct