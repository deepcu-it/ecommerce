import {legacy_createStore,combineReducers,applyMiddleware} from "redux";
import { thunk, withExtraArgument } from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailReducer, productReducer } from "./reducers/ProductReducer";
import {PasswordReducer, ProfileReducer, getUser} from "./reducers/UserReducer";

const reducer= combineReducers({
    products:productReducer,
    productDetails: productDetailReducer,
    user:getUser,
    UpdatedUser:ProfileReducer,
    forgotPassword:PasswordReducer
})


let initialState={};
const middleWare=[thunk];

const store= legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;