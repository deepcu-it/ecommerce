import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction.js";
import Loader from "../layout/Loader.js";
import ProductSearch from "./ProductSearch.js";
import { useParams,useNavigate } from "react-router-dom";
import Product from "../Home/product.js"
import ProductFilter from "./ProductFilter.js";
import Slider from '@mui/material/Slider';


const AllProducts = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const [price,setPrice] = useState([0,25000]);
  const [sizeOfWindow,setSizeOfWindow] = useState(window.innerWidth);

  const fixingWindowSize= () => setSizeOfWindow(window.innerWidth);

useEffect(() => {
  window.addEventListener("resize", fixingWindowSize);
  return () => {
    window.removeEventListener("resize", fixingWindowSize);
  };
}, []);

  const { loading,products, productCount, resultperPage } = useSelector((state) => state.products);
  const numberOfPages = (productCount && resultperPage) ? Math.floor(productCount / resultperPage) + 1 : 1;

  
  useEffect(() => {
    dispatch(getProduct(keyword,currentPage,price));
   
  }, [dispatch, keyword,currentPage,price]);


  const customPagination = {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "20px",
  };
  
  

  const handleMouse = (index) => {
    setSelectedPageIndex(index);
  };
  const handlePage= (index) => {
    setCurrentPage(index);
    //handleMouse(index+1);
  }
  const handlePrice = (event,newPrice) => {
    setPrice(newPrice);
    
  }
  const valuetext = (price) => {
    return `${price}`;
  };
  
  const paginationBox = (index) => ({
    backgroundColor:"white",
    color: "black",
    height: "40px",
    maxWidth: "40px",
    padding: "5px",
    border: "2px black solid",
    margin: "5px",
  });

  const customStyleofRow = {
    alignItems: "center",
    textAlign: "center",

    justifyContent: "center",
};
const customSearch = {
  alignItems:"center",
  justifyContent:"center",
  display:sizeOfWindow>600 ? "flex" : "",
}

  return (
    <Row>
      <div className="height1"></div>
      <div style={customSearch}>
        <div style={{color:"white",width:"250px",margin:"60px"}}>
          <h3>Filter product by price </h3>
          {/* <Slider
  getAriaLabel={() => 'Minimum distance'}
  value={price}
  onChange={handlePrice}
  valueLabelDisplay="auto"
  getAriaValueText={valuetext}
  disableSwap
/> */}

      <h4>Min Price:{price && price[0]}</h4>
      <h4>Max Price:{price && price[1]}</h4>
        </div>
        <ProductSearch />

      </div>
      <ProductFilter/>
      <div className="height1"></div>

      <Row style={customStyleofRow}>
        {!loading ? (
          products.length? (
          products.map((product, index) => (
            <Col>
              <Link to={`/product/${product._id}`} >
                 <Product
                    key={product._id} // Assuming each product has a unique identifier
                    P_id={product._id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={product.images}
                    rating={product.rating}
                    reviewCount={product.reviews.length}
                   />
              </Link>
              </Col>
          ))) : (
            <h2>No product found</h2>
          )
        ) : (
          <Loader />
        )}
      </Row>
      <Row style={customPagination}>
        {[...Array(numberOfPages)].map((_, index) => (

          <Col onClick={()=> handlePage(index+1)} key={index} style={paginationBox(index)}>
            {index+1}
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default AllProducts;
