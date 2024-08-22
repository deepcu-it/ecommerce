import react,{useEffect,useState} from "react"
import "./CreateAndUpdateProduct.css"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import {clearErrors, createNewProduct} from "../../../actions/productAction"
import {Button} from "react-bootstrap"
import { notify } from "../../notification"
import Loader from "../../layout/Loader"
const CreateProduct = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [name,setname] = useState("");
    const [price,setprice] = useState("");
    const [stock,setstock] = useState("");
    const [category,setcategory] = useState("");
    const [description,setdescription] = useState("");
    const [public_id,setPublic_id] = useState("");
    const [url,seturl] = useState("");

    const handleCreateProduct= (e) =>{
        e.preventDefault();
        const productData = {
            name,
            price,
            stock,
            category,
            description,
            images:{
                public_id,
                url
            }
          };
          dispatch(createNewProduct(productData));
    }
    
    const {loading,product,newProduct,error} = useSelector((state)=>state.productDetails);
    useEffect(()=>{
        if(error) {
            notify(error)
           dispatch(clearErrors());
           return;
        }
        if(newProduct) {
            notify("Product created successfully")
            navigate("/admin-route");
        }
    },[error,newProduct])
    return(
      <div>
            <div className="height1"></div>
            <div className="create-product">
                <h1>Create And Update Product</h1>
                <div className="create-product-container">
                    <div className="create-product-left">
                            <label>Name:</label>
                            <input onChange={(e)=>setname(e.target.value)} className="input" type="text" />

                            <label>Price:</label>
                            <input type="text" onChange={(e)=>setprice(e.target.value)} className="input"/>

                            <label>Stock:</label>
                            <input type="number" onChange={(e)=>setstock(e.target.value)} className="input"/>

                            <label>Category:</label>
                            <input type="text" onChange={(e)=>setcategory(e.target.value)} className="input"/>
                    </div>
                    <div className="create-product-right">
                            <label>Description:</label>
                            <textarea type="text" className="input" onChange={(e)=>setdescription(e.target.value)}/>

                            <label>Images:</label>
                            <div className="create-product-images">
                                <label>Public_id:</label>
                                <input type="text" className="input"  onChange={(e)=>setPublic_id(e.target.value)}/>
                                <label>Url:</label>
                                <input className="input" onChange={(e)=>seturl(e.target.value)} type="text" />
                            </div>

                    </div>
                </div>
                <Button onClick={handleCreateProduct}>Create product</Button>
            </div>
            <div className="height1"></div>
        </div>
    )
}
export default CreateProduct