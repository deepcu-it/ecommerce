import { ALL_PRODUCT_FAIL, 
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
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL} from "../consents/productConsents.js";

export const productReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
            };
        case DELETE_PRODUCT_REQUEST:
            return {
                loading: true,
                isDeleted:false
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultperPage:action.payload.resultperPage,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading:false,
                isDeleted:action.payload
            }
        case DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                products:[],
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const productDetailReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
        case CREATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                newProduct: true,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
        case CREATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
export const UpdatedProduct = (state={loading:true,product:{}},action)=>{
    switch(action.type){
        case UPDATE_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return{
                loading:false,
                isUpdated:true,
                product:action.payload
            }
        case UPDATE_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }

}