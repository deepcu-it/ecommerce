import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import AdminGetAllProducts from "./AdminGetAllProducts";
import Loader from "../../layout/Loader";

const AdminProduct = () => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct("",currentPage));
  }, [dispatch, currentPage]);
  const { loading, products, productCount, resultperPage } = useSelector((state) => state.products);
  const numberOfPages = productCount && resultperPage ? Math.floor(productCount / resultperPage) + 1 : 1;


  const customPagination = {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "20px",
  };

  const paginationBox = (index) => ({
    backgroundColor: selectedPageIndex === index ? "blue" : "white",
    color: "black",
    height: "40px",
    maxWidth: "40px",
    padding: "5px",
    border: "2px black solid",
    margin: "5px",
  });



  const handlePage = (index) => {
    setCurrentPage(index);
    setSelectedPageIndex(index - 1);
  };

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="admin-product-container">
        <h1>Products</h1>
        <Link to="/admin-route/product/create">
          <Button>Create a New Product</Button>
        </Link>
        {products && products.map((product) => (
            <AdminGetAllProducts
              key={product._id}
              p_id={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              rating={product.rating}
            />
          ))}
        <Row style={customPagination}>
          {[...Array(numberOfPages)].map((_, index) => (
            <Col onClick={() => handlePage(index + 1)} key={index} style={paginationBox(index)}>
              {index + 1}
            </Col>
          ))}
        </Row>
      </div>
    )
  );
};

export default AdminProduct;
