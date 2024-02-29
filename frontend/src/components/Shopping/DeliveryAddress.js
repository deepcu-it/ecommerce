import react,{ useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate ,useParams} from "react-router-dom";
import Loader from "../layout/Loader";
import { getProductDetails } from "../../actions/productAction";
import { notify,ToastContainer } from "../notification";
import { placeOrder } from "../../actions/orderAction";


const DeliveryAddress = () => {
    const { product } = useSelector((state) => state.productDetails);
    const {order,error} = useSelector((state) =>state.placeOrder);
    const {user} = useSelector((state)=>state.user);
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState(user.name);
    const [phoneNumber, setPhoneNo] = useState(user.phoneNo);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();

    const handleAddressSubmit =  () => {
        if(pincode === "" || state === "" || country === "" || address === "" || city === "") {
            notify("Please enter all the details");
            return;
        }
        dispatch(placeOrder([product],user._id,{pincode, state, country, name, phoneNumber, address, city}));
    }
    useEffect(()=>{
        if(error) notify(error);
        if(order) navigate(`/products/payment/${id}`);
    },[error,order]);
    useEffect(()=>{
        dispatch(getProductDetails(id));
    },[id])
    return (
            <div>
            <ToastContainer />
            <div className="height1"></div>
            <div className="buy-now-container">
                <div className="buy-now-text">
                    <h1>Address Information</h1>
                    <h3>Provide the required address details to complete your purchase.</h3>
                    <Button>Complete Addressing</Button>
                </div>
                <div className="buy-now-input">
                    <div className="buy-now-payment-form">
                        <label>Full Name:</label>
                        <input onChange={(e)=>setName(e.target.value)} type="text" className="input" defaultValue={user.name} required />
                        
                        <label>City</label>
                        <input onChange={(e)=>setCity(e.target.value)} type="text" className="input"  required />

                        <label>State</label>
                        <input onChange={(e)=>setState(e.target.value)} type="text" className="input"   required />

                        <label>country</label>
                        <input onChange={(e)=>setCountry(e.target.value)} type="text" className="input"  required />
                        
                        <label>Pincode</label>
                        <input onChange={(e)=>setPincode(e.target.value)} type="text" className="input" required />

                        <label>Contact No.</label>
                        <input onChange={(e)=>setPhoneNo(e.target.value)} type="text" className="input" defaultValue={user.phoneNo}  required />

                        <label>Full address:</label>
                        <textarea onChange={(e)=>setAddress(e.target.value)} type="text" className="input" placeholder="Enter your address" required />

                        <button onClick={handleAddressSubmit} className="buy-now-button">Submit Address</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default DeliveryAddress