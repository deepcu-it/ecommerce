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

const baseURL = "https://ecommerce-bytb.onrender.com/api/v1";

// Get Products
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000]) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");
    let link = `${baseURL}/products?keyword=${keyword}&page=${currentPage}`;
    if (price && price[0] !== undefined && price[1] !== undefined) {
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, config);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.message;

    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: errorMessage,
    });
  }
};

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${baseURL}/product/${id}`, config);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const errorMessage = error.message;

    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const createNewProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${baseURL}/product/new`, product, config);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    const errorMessage = error.message;

    dispatch({ type: CREATE_PRODUCT_FAIL, payload: errorMessage });
  }
};


export const updateProduct = (id, product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${baseURL}/product/${id}`, product, config);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    const errorMessage = error.message;
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: errorMessage });
  }
};


// Get Updated Product Details
export const getUpdatedProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const { data } = await axios.get(`${baseURL}/product/${id}`);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const errorMessage = error.message;
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: errorMessage,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`${baseURL}/product/${id}`, config);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    const errorMessage = error.message;
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: errorMessage });
  }
};


// New Review
export const newReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REVIEW_REQUEST" });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.put(`${baseURL}/review`, review, config);
    dispatch({ type: "PRODUCT_REVIEW_SUCCESS" });
  } catch (error) {
    dispatch({ type: "PRODUCT_REVIEW_FAIL" });
  }
};


// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
