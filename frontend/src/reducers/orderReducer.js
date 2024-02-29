import {PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    CLEAR_ERROR,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    PLACE_ORDER_FAIL} from "../consents/orderConsent";

export const OrderReducer = (state={loading:true},action) =>{
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return {
                loading:true,
            }
        case PLACE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload ,
            }
        case PLACE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload ,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const AllOrderReducer = (state={loading:true},action) =>{
    switch (action.type) {
        case ALL_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case ALL_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload ,
            }
        case ALL_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}