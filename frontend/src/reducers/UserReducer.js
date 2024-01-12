import { USER_FAIL,
     USER_REQUEST, 
     USER_SUCCESS, 
     LOGIN_USER_FAIL,
     LOGIN_USER_REQUEST,
     LOGIN_USER_SUCCESS,
     LOGOUT_SUCCESS,
     LOGOUT_FAIL,
     CLEAR_ERROR } from "../consents/userConsent";


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
            
            loading:false,
            isAuthenticated :true,
            user:action.payload,
        }
        case LOGOUT_SUCCESS:
            return {
                loading:false,
                user:null,
                isAuthenticated:false,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case USER_FAIL:
            return {   
                ...state,
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
            return {
                state
            }
    }
}