import react, { useEffect, useState } from "react";
import OrderComponent from "./OrderComponent.js";
import { useDispatch,useSelector } from "react-redux";
import { adminGetAllOrder } from "../../../actions/orderAction";
import Loader from "../../layout/Loader";
import "./AdminOrder.css";
const AdminOrder = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(adminGetAllOrder());
    }, [dispatch])
    const {loading, orders} = useSelector((state) => state.AllOrder);
    return (
        loading?<Loader/>:<div className="admin-order-container">
            <h1>Orders</h1>
            <table className="admin-order-table">
                <thead>
                    <tr className="admin-order-table-row">
                        <th>Product</th>
                        <th>quantity</th>
                        <th>status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                {orders.orders.map((order) => (
                    <OrderComponent
                    key={order._id}
                    _id={order._id}
                    name={order.orderItems[0].name}
                    status={order.orderStatus}
                    price={order.orderItems[0].price}
                    quantity={order.orderItems[0].quantity}
                    />
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default AdminOrder