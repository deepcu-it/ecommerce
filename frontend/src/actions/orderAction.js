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

export const placeOrder = (orderItems,user,shippingInfo) => async (dispatch) => {
    try {
        dispatch({type: PLACE_ORDER_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const {data} = await axios.post("/api/v1/order/new", {orderItems,user,shippingInfo}, config);
        dispatch({type: PLACE_ORDER_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response.data.err
        });
    }
}
export const cancelOrder =(id)=> async(dispatch) =>{
    try{
        dispatch({type:CANCEL_ORDER_REQUEST})
        const {data} = await axios.delete(`/api/v1/order/delete/${id}`);
        dispatch({type:CANCEL_ORDER_SUCCESS,payload:data});
    }catch(error) {
        dispatch({type: CANCEL_ORDER_FAIL,payload:error.response.data.err});
    }
} 

export const getAllOrder = ()  => async(dispatch) =>{
    try{
        dispatch({type: ALL_ORDER_REQUEST});
        const {data} = await axios.get("/api/v1/order/me");
        dispatch({type:ALL_ORDER_SUCCESS,payload:data.orders});
    }catch(error) {
        const errorMessage =error.response.data.err;
        dispatch({type: ALL_ORDER_FAIL, payload: errorMessage});
    }
}

export const adminGetAllOrder =()=> async(dispatch)=>{
    try{
        dispatch({type:ADMIN_ALL_ORDER_REQUEST});
        const {data} = await axios.get("/api/v1/order")
        console.log(data);
        dispatch({type:ADMIN_ALL_ORDER_SUCCESS,payload:data});
    }catch(error) {
        const errorMessage =error.response.data.err;
        dispatch({type: ADMIN_ALL_ORDER_FAIL, payload: errorMessage});
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({type: CLEAR_ERROR});
}
