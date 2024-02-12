import { ADD_TO_CART, REMOVE_FROM_CART } from "../consents/cartConsents";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images.url,
            stock: data.product.stock,
            description:data.product.description,
            reviewCount:data.product.reviewCount,
            quantity,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart = (productId) => (dispatch,getState)=>{
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  