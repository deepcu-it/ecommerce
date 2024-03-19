import React, { useEffect } from "react";
import "./myorder.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder} from "../../actions/orderAction";
import Loader from "../layout/Loader";
import {Button} from "react-bootstrap";
import {notify} from "../notification";

const MyOrder = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrder());
        if(error) notify(error);
    }, [dispatch]);

    const { loading, orders, error } = useSelector((state) => state.AllOrder);


    return (
        loading ? <Loader /> :
            <div>
                <div className="height1"></div>
                <table className="order-table">
                        <tr>
                            <th>Product name</th>
                            <th>Order</th>
                            <th>status</th> 
                        </tr>
                        {orders ? orders.map((order,index) => (
                            <tr className="order-table-row" key={order._id}>
                                <td className="order-name-cell">{index+1}. {order.orderItems[0].name}</td>
                                <td>{order.deliveryAt.slice(0,10)}</td>
                                <td>
                                    <Button>{order.orderStatus}</Button>
                                </td>
                            </tr>
                        )): <p>No order found</p>}
                </table>
                <div className="height1"></div>
            </div>
    );
}

export default MyOrder;
