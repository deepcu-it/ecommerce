import React from "react";
import { Button } from "react-bootstrap";
import "./AdminOrder.css"

const OrderComponent = (props) => {
    return (
        <tr className="admin-order-table-row">
            <td>{props.name}</td>
            <td>{props.quantity}</td>
            <td>{props.status}</td>
            <td><Button>Delete</Button></td>
        </tr>
    )
}

export default OrderComponent