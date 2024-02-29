import {legacy_createStore,combineReducers,applyMiddleware} from "redux";
import { thunk, withExtraArgument } from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailReducer, productReducer } from "./reducers/ProductReducer";
import {PasswordReducer, ProfileReducer, getUser} from "./reducers/UserReducer";
import { CartReducer } from "./reducers/cartReducer";
import {OrderReducer, AllOrderReducer} from "./reducers/orderReducer"

const reducer= combineReducers({
    products:productReducer,
    productDetails: productDetailReducer,
    user:getUser,
    UpdatedUser:ProfileReducer,
    forgotPassword:PasswordReducer,
    cart:CartReducer,
    placeOrder:OrderReducer,
    AllOrder:AllOrderReducer
})


let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
    }
};
const middleWare=[thunk];

const store= legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;