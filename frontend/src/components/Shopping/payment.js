import react, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./payment.css";
import { Button } from "react-bootstrap";

const Payment = () => {
    const [cardPayment, setCardPayment] = useState(false);
    const [upiPayment, setUpiPayment] = useState(false);
    const {loading,product} = useSelector((state)=>state.productDetails);
    const navigate = useNavigate();
    const handlePayment = () => {
        navigate("/products/payment/success/confirmation");
    }
    return (
        <div>
            <div className="height1"></div>
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
                        {cardPayment && <div className="buy-now-payment-form">
                            <label>Card Number:</label>
                            <input type="text" className="input" name="cardNumber" placeholder="1234 1234 1234 1234" required />
                            <span></span>
                            

                            <label>Name on Card:</label>
                            <input type="text" className="input" name="cardName" placeholder="John Doe" required />

                            <label >Expiry Date:</label>
                            <input type="text" className="input" name="expiryDate" placeholder="MM/YY" required />

                            <label >CVV:</label>
                            <input type="text" className="input" name="cvv" placeholder="123" required />
                                
                            <button onClick={handlePayment} className="buy-now-button">Pay ${product.price}</button>
                        </div>}
                        {upiPayment && <div className="buy-now-payment-form">
                            <label>UPI ID:</label>
                            <input type="text" className="input" name="upiId" placeholder="example@upi" required />

                            <label>UPI PIN:</label>
                            <input type="password" className="input" name="upiPin" placeholder="****" required />

                            <button onClick={handlePayment} className="buy-now-button">Pay ${product.price}</button>
                        </div>}
                    </div>
                </div>
        </div>
    );
};

export default Payment;