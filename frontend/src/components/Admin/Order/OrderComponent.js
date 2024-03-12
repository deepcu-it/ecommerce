import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "./AdminOrder.css"
import { useDispatch,useSelector } from "react-redux";
import { cancelOrder, clearError } from "../../../actions/orderAction";
import { notify } from "../../notification";

const OrderComponent = (props) => {
    const dispatch = useDispatch();
    const handleOrderDelete = () => {
        dispatch(cancelOrder(props._id));
    }
    const {isDeleted, error} = useSelector(state => state.deleteItem);
    useEffect(() => {
        if(isDeleted) {
            notify("Order Deleted");
            window.location.reload();
        }
        if(error){
            notify(error);
            clearError();
        }

    },[dispatch, error, isDeleted])
    return (
        <tr className="admin-order-table-row">
            <td>{props.name}</td>
            <td>{props.quantity}</td>
            <td>{props.status}</td>
            <td><Button onClick={handleOrderDelete}>Delete</Button></td>
        </tr>
    )
}

export default OrderComponent