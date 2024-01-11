import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,

  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,

  CLEAR_ERROR,
} from "../consents/productConsents.js";
export const getProduct = (keyword="",currentPage,price= [0,25000]) => async (dispatch) => {
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
    // Check if error.response exists and has data property before accessing its message
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


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
