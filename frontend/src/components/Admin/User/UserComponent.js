import React from "react";
import { Button } from "react-bootstrap";
import "../Order/AdminOrder.css"

const UserComponent = (props) => {
    return (
        <tr className="admin-order-table-row">
            <td>{props.name}</td>
            <td>{props.role}</td>
            <td>{props.email}</td>
            <td><Button>Delete</Button></td>
        </tr>
    )
}

export default UserComponent