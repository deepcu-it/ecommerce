import "./AdminProduct.css"
import { Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { notify } from "../../notification";
import { deleteProduct, getProduct,clearErrors } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/Loader";
import { useEffect } from "react";

const AdminGetAllProducts = (props) => {
    const dispatch = useDispatch();
  

    const {loading,error,isDeleted} = useSelector(state => state.products);
    const handleDeleteProduct = () => {

        dispatch(deleteProduct(props.p_id));
        notify("Product Deleted");
       
    }
    
    return (
        loading?<Loader/>:<div className="admin-product-details-container">
            <div className="admin-product-image-container">
                <img className="admin-product-image" src="https://i.pinimg.com/236x/dc/d4/0d/dcd40d9a7f9cf6a52e6cd4b2b93b15f6.jpg" alt="product" />
            </div>
            <div className="admin-product-get-details">
                <div className="admin-product-details-heading">
                    <h2>{props.name}</h2>
                    <h3>{props.price}</h3>
                </div>
                <div>
                    <ReactStars
                        count={5}
                        size={24}
                        color2={'#ffd700'}
                        value={props.rating}
                    />
                </div>
                <div className="admin-product-description">
                    <p>{props.description}</p>
                </div>
                <div ><Link to={`/admin-route/product/update/${props.p_id}`}><Button style={{ width: "100%", marginBottom: "10px" }}>Update</Button></Link></div>
                <div ><Link><Button onClick={handleDeleteProduct} style={{ width: "100%" }}>Delete</Button></Link></div>
            </div>
        </div>
    )
}

export default AdminGetAllProducts