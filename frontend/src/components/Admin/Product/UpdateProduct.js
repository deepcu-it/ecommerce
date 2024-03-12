import React, { useEffect, useState } from "react";
import "./CreateAndUpdateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import { clearErrors, updateProduct} from "../../../actions/productAction";
import { Button } from "react-bootstrap";
import { notify } from "../../notification";
import Loader from "../../layout/Loader";
import { getProductDetails } from "../../../actions/productAction";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetails(id));
  },[id]);

  const { loading1, product,error1 } = useSelector((state) => state.productDetails);
  const { loading2,isUpdated, error2 } = useSelector((state) => state.UpdateProduct);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [public_id, setPublic_id] = useState("");
  const [url, setUrl] = useState("");

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if(public_id ==="" || url==="") {
      notify("Enter all details");
      return;
    }
    const updatedProduct = {
      name,
      price,
      stock,
      category,
      description,
      images:{
        public_id,
        url
      }
    }
    dispatch(updateProduct(product._id,updatedProduct));
  }

  useEffect(() => {
    if (error2) {
      notify(error2);
      dispatch(clearErrors());
      return;
    }
    if(isUpdated) {
      notify("Product updated successfully")
      navigate("/admin-route");
    }
  }, [dispatch,error2,isUpdated]);

  return loading1 ? (
    <Loader />
  ) : (
    <div>
      <div className="height1"></div>
      <div className="create-product">
        <h1>Update Product</h1>
        <h3>Enter details Whatever you need to update and the product will be updated</h3>
        <h3>public_id and Url is must</h3>
        <div className="create-product-container">
          <div className="create-product-left">
            <label>Name:</label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="input"
              type="text"
              defaultValue={name}
            />

            <label>Price:</label>
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              defaultValue={price}
            />

            <label>Stock:</label>
            <input
              type="number"
              onChange={(e) => setStock(e.target.value)}
              className="input"
              defaultValue={stock}
            />

            <label>Category:</label>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              defaultValue={category}
            />
          </div>
          <div className="create-product-right">
            <label>Description:</label>
            <textarea
              type="text"
              className="input"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
            />

            <label>Images:</label>
            <div className="create-product-images">
              <label>Public_id:</label>
              <input
                type="text"
                className="input"
                onChange={(e) => setPublic_id(e.target.value)}
                defaultValue={public_id}
              />
              <label>Url:</label>
              <input
                className="input"
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                defaultValue={url}
              />
            </div>
          </div>
          <Button onClick={handleUpdateProduct}>Update product</Button>
        </div>
      </div>
      <div className="height1"></div>
    </div>
  );
};

export default UpdateProduct;
