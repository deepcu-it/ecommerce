import react, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Loader from "../../layout/Loader";
import "../Order/AdminOrder.css";
import UserComponent from "./UserComponent.js";
import { getAllUser } from "../../../actions/userAction";
const AdminUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch])
    const {loading, users} = useSelector((state) => state.getAllUser);
    return (
        loading?<Loader/>:<div className="admin-order-container">
            <h1>AllUser</h1>
            <table className="admin-order-table">
                <thead>
                    <tr className="admin-order-table-row">
                        <th>User</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <UserComponent
                        key={user._id}
                        name={user.name}
                        role={user.role}
                        email={user.email}
                    />
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default AdminUser