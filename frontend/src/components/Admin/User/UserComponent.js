import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "../Order/AdminOrder.css"
import { useDispatch,useSelector } from "react-redux";
import { clearErrors, deleteUser } from "../../../actions/userAction";
import { notify } from "../../notification";

const UserComponent = (props) => {
    const dispatch = useDispatch();
    const handleUserDelete = () => {
        dispatch(deleteUser(props._id));
    }
    const {isDeleted, error} = useSelector(state => state.deleteItem);
    useEffect(() => {
        if(isDeleted) {
            notify("User Deleted");
            window.location.reload();
        }
        if(error){
            notify(error);
            clearErrors();
        }
    },[dispatch, error, isDeleted])
    return (
        <tr className="admin-order-table-row">
            <td>{props.name}</td>
            <td>{props.role}</td>
            <td>{props.email}</td>
            <td><Button onClick={handleUserDelete}>Delete</Button></td>
        </tr>
    )
}

export default UserComponent