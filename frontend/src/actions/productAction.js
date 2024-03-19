import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,

  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  CLEAR_ERROR,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
} from "../consents/productConsents.js";
export const getProduct = (keyword="",currentPage=1,price= [0,25000]) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
    if (price && price[0] !== undefined && price[1] !== undefined) {
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }

    const { data } = await axios.get(link);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Check if error.response exists and has data property before accessing its message
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred";

    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: errorMessage,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred";

    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const createNewProduct = (product)=>async (dispatch)=>{
  try {
    dispatch({type:CREATE_PRODUCT_REQUEST})
    const config = {headers:{"Content-Type":"application/json"}}
    const {data} = await axios.post("/api/v1/product/new",product,config);
    dispatch({type:CREATE_PRODUCT_SUCCESS,payload:data.product});
    
  }catch(error) {
    const errorMessage = error.response && error.response.data && error.response.data.err;
    dispatch({type:CREATE_PRODUCT_FAIL,payload:errorMessage});
  }
}
export const updateProduct = (id,product)=>async (dispatch)=>{
  try{
    dispatch({type:UPDATE_PRODUCT_REQUEST});
    const config = {headers:{"Content-Type":"application/json"}}
    const {data} = await axios.put(`/api/v1/product/${id}`,product,config);
    dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data.product});

  }catch(error) {
    const errorMessage = error.response && error.response.data && error.response.data.err;
    dispatch({type:UPDATE_PRODUCT_FAIL,payload:errorMessage});
  }
}
export const getUpdatedProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred";

    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: errorMessage,
    });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try{
    dispatch({type:DELETE_PRODUCT_REQUEST});
    const {data} = await axios.delete(`/api/v1/product/${id}`);
    dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data.success});
  }catch(error) {
    const errorMessage = error.response && error.response.data && error.response.data.err;
    dispatch({type:DELETE_PRODUCT_FAIL,payload:errorMessage});
  }
}
export const newReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REVIEW_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/v1/review", review, config);
    dispatch({ type: "PRODUCT_REVIEW_SUCCESS"});

  }catch (error) {
    dispatch({type: "PRODUCT_REVIEW_FAIL"});
  }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
