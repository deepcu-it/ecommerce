import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import "./payment.css";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { notify, ToastContainer } from "../notification";

const Payment = () => {
    const [cardPayment, setCardPayment] = useState(false);
    const [upiPayment, setUpiPayment] = useState(false);
    const dispatch= useDispatch();
    const {id} = useParams();
    useEffect(()=>{
        dispatch(getProductDetails(id));
        // if(error) {
        //     notify(error);
        // }
    },[id]);
    const {loading,product} = useSelector((state)=>state.productDetails);
    return (
        loading? <Loader/> : <div>
            <div className="height1"></div>
            <ToastContainer/>
                <div className="buy-now-container">
                    <div className="buy-now-text">
                        <h1>Billing and Payment</h1>
                        <h3>A secure and convenient payment process for purchasing your favorite products online.</h3>
                        <Button>Complete purchasing</Button>
                    </div>
                    <div className="buy-now-input">
                        <div className="payment-method-select">
                            <div className="checkbox-group">
                                <input type="checkbox"
                                    id="cardPaymentCheckbox"
                                    checked={cardPayment}
                                    onChange={() => {
                                        setCardPayment(!cardPayment);
                                        setUpiPayment(false);
                                    }}
                                />
                                <label>Pay with Card</label>
                            </div>
                            <div className="checkbox-group">
                                <input type="checkbox"
                                    id="upiPaymentCheckbox"
                                    checked={upiPayment}
                                    onChange={() => {
                                        setUpiPayment(!upiPayment);
                                        setCardPayment(false);
                                    }}
                                />
                                <label>Pay with UPI</label>
                            </div>
                        </div>
                        {cardPayment && <form className="buy-now-payment-form">
                            <label>Card Number:</label>
                            <input type="text" className="input" name="cardNumber" placeholder="1234 1234 1234 1234" required />

                            <label>Name on Card:</label>
                            <input type="text" className="input" name="cardName" placeholder="John Doe" required />

                            <label >Expiry Date:</label>
                            <input type="text" className="input" name="expiryDate" placeholder="MM/YY" required />

                            <label >CVV:</label>
                            <input type="text" className="input" name="cvv" placeholder="123" required />

                            <button type="submit" className="buy-now-button">Pay $ {product.price}</button>
                        </form>}
                        {upiPayment && <form className="buy-now-payment-form">
                            <label>UPI ID:</label>
                            <input type="text" className="input" name="upiId" placeholder="example@upi" required />

                            <label>UPI PIN:</label>
                            <input type="password" className="input" name="upiPin" placeholder="****" required />

                            <button type="submit" className="buy-now-button">Pay $ {product.price}</button>
                        </form>}
                    </div>
                </div>
        </div>
    );
};

export default Payment;