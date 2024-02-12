import { ADD_TO_CART , REMOVE_FROM_CART} from "../consents/cartConsents";

export const CartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.product === item.product);
            if(isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.product === isItemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_FROM_CART:
            const updatedItems = state.cartItems.filter((i) => i.product !== action.payload);
            return {
                ...state,
                cartItems: updatedItems
            }
            
            
        default:
            return state;
    }
}

