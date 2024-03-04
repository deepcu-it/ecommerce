import React ,{useState} from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminProduct from "./AdminProduct.js"
import "./AdminHome.css"
const AdminHome = ()=>{
    const [openProduct,setOpenProduct]=useState(false);
    const [openOrder,setOpenOrder]=useState(false);
    const [openUser,setOpenUser]=useState(false);
    const handleOpenBar = (option)=> {
        switch (option) {
            case "product":
                setOpenProduct(!openProduct)
                setOpenOrder(false)
                setOpenUser(false)
                break;
            case "order":
                setOpenOrder(!openOrder)
                setOpenUser(false)
                setOpenProduct(false)
                break;
            case "user":
                setOpenUser(!openUser)
                setOpenOrder(false)
                setOpenProduct(false)
                break;
        }
    }
    
    return (
        <>
            <div className="height1"></div>
            <div className="admin-home-container">
                <Link onClick={()=> handleOpenBar("product")} ><Button>Products</Button></Link>
                <Link onClick={()=>handleOpenBar("user")}><Button>Users</Button></Link>
                <Link onClick={()=>handleOpenBar("order")}><Button>Orders</Button></Link>
            </div>
            <div className="admin-home-content">
                {openProduct && <AdminProduct/>}
            </div>
            <div className="height1"></div>
        </>
    )
}

export default AdminHome