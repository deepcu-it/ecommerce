import { USER_FAIL,
     USER_REQUEST, 
     USER_SUCCESS, 
     LOGIN_USER_FAIL,
     LOGIN_USER_REQUEST,
     LOGIN_USER_SUCCESS,
     LOGOUT_SUCCESS,
     LOGOUT_FAIL,
     UPDATE_USER_FAIL,
     UPDATE_USER_REQUEST,
     UPDATE_USER_RESET,
     UPDATE_USER_SUCCESS,
     UPDATE_PASSWORD_FAIL,
     UPDATE_PASSWORD_REQUEST,
     UPDATE_PASSWORD_SUCCESS,
     UPDATE_PASSWORD_RESET,
     FORGOT_PASSWORD_FAIL,
     FORGOT_PASSWORD_REQUEST,
     FORGOT_PASSWORD_SUCCESS,
     ADMIN_GET_ALL_USER_FAIL,
     ADMIN_GET_ALL_USER_REQUEST,
     ADMIN_GET_ALL_USER_SUCCESS,
     DELETE_USER_FAIL,
     DELETE_USER_REQUEST,
     DELETE_USER_SUCCESS,
     CLEAR_ERROR } from "../consents/userConsent";
import {CANCEL_ORDER_FAIL, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS } from "../consents/orderConsent";

export const getUser = (state={loading:true,user:{}},action) => {
    switch (action.type) {
        case USER_REQUEST:
            case LOGIN_USER_REQUEST:
           return {
            loading:true,
            isAuthenticated :false,
           
        }
        case USER_SUCCESS:
            case LOGIN_USER_SUCCESS:
                return {
                    loading: false,
                    isAuthenticated: true,
                    user: action.payload ,
                  };
        case LOGOUT_SUCCESS:
            return {
            
                loading:false,
                user:null,
                isAuthenticated:false,
            }
        case LOGOUT_FAIL:
            return {
                loading:false,
                error:action.payload,
            }
        case USER_FAIL:
            return {   
            
            loading:false,
            isAuthenticated :false,
            user:null,
            error:action.payload,
        }
        case LOGIN_USER_FAIL:
        return {
            loading:false,
            isAuthenticated :false,
            user:null,
            error:action.payload,
        }
        case CLEAR_ERROR : 
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}

export const ProfileReducer = (state={loading:true,isUpdated:false},action)=> {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case UPDATE_USER_SUCCESS:
            case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload,
            }
        case UPDATE_USER_FAIL:
            case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }

        case UPDATE_USER_RESET:
            case UPDATE_PASSWORD_RESET:
            return {
                loading:false,
                isUpdated:false,
            }
        case CLEAR_ERROR :{
            return {
                ...state,
                error:null,
            }
        }
        default:
            return state;
    }
}
export const PasswordReducer = (state = {loading: true, isForgotted: false}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isForgotted: action.payload,
            }
        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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
export const getAllUserReducer = (state={loading:true,users:[]},action)=>{
    switch (action.type) {
        case ADMIN_GET_ALL_USER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case ADMIN_GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                users:action.payload
            }
        case ADMIN_GET_ALL_USER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}
export const deleteUserReducer = (state={loading:true,isDeleted:false},action)=>{
    switch (action.type) {
        case DELETE_USER_REQUEST:
            case CANCEL_ORDER_REQUEST:
            return {
                ...state,
                loading:true

            }
        case DELETE_USER_SUCCESS:
            case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:true
            }
        case DELETE_USER_FAIL:
            case CANCEL_ORDER_FAIL:
            return {
                
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}