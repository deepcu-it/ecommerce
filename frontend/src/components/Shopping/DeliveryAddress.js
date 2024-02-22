import react,{ useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate ,useParams} from "react-router-dom";
import Loader from "../layout/Loader";
import { getProductDetails } from "../../actions/productAction";

const DeliveryAddress = () => {
    const { loading, product } = useSelector((state) => state.productDetails);
    const {user} = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProductDetails(id));
    },[id])
    return (
       loading? <Loader/> :<div>
            <div className="height1"></div>
            <div className="buy-now-container">
                <div className="buy-now-text">
                    <h1>Address Information</h1>
                    <h3>Provide the required address details to complete your purchase.</h3>
                    <Button>Complete Addressing</Button>
                </div>
                <div className="buy-now-input">
                    <form className="buy-now-payment-form">
                        <label>Full Name:</label>
                        <input type="text" className="input" defaultValue={user.name} required />

                        <label>Contact No.</label>
                        <input type="text" className="input" defaultValue={user.phoneNo}  required />

                        <label>Full address:</label>
                        <textarea type="text" className="input" placeholder="Enter your address" required />

                        <button type="submit" onClick={() => navigate(`/products/payment/${product._id}`)} className="buy-now-button">Submit Address</button>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};
export default DeliveryAddress