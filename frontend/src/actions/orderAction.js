import axios from "axios";
import {
    PLACE_ORDER_FAIL,
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    CANCEL_ORDER_SUCCESS,
    CLEAR_ERROR,
    CANCEL_ORDER_FAIL,
    CANCEL_ORDER_REQUEST,
    ADMIN_ALL_ORDER_FAIL,
    ADMIN_ALL_ORDER_SUCCESS,
    ADMIN_ALL_ORDER_REQUEST
} from "../consents/orderConsent";

const baseURL = "https://ecommerce-bytb.onrender.com/api/v1";

// Place Order
export const placeOrder = (orderItems, user, shippingInfo) => async (dispatch) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${baseURL}/order/new`, { orderItems, user, shippingInfo }, config);
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data && error.response.data.err
                ? error.response.data.err
                : "An error occurred"
        });
    }
}

// Cancel Order
export const cancelOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_ORDER_REQUEST });
        const { data } = await axios.delete(`${baseURL}/order/delete/${id}`);
        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CANCEL_ORDER_FAIL,
            payload: error.response && error.response.data && error.response.data.err
                ? error.response.data.err
                : "An error occurred"
        });
    }
}

// Get All Orders for User
export const getAllOrder = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDER_REQUEST });
        const { data } = await axios.get(`${baseURL}/order/me`);
        dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response && error.response.data && error.response.data.err
                ? error.response.data.err
                : "An error occurred"
        });
    }
}

// Get All Orders for Admin
export const adminGetAllOrder = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ALL_ORDER_REQUEST });
        const { data } = await axios.get(`${baseURL}/order`);
        dispatch({ type: ADMIN_ALL_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_ALL_ORDER_FAIL,
            payload: error.response && error.response.data && error.response.data.err
                ? error.response.data.err
                : "An error occurred"
        });
    }
}

// Clear Errors
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}
