import axios from "axios";
import {
  USER_FAIL,
  USER_REQUEST,
  USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  CLEAR_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  ADMIN_GET_ALL_USER_FAIL,
  ADMIN_GET_ALL_USER_REQUEST,
  ADMIN_GET_ALL_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../consents/userConsent.js";
import { DELETE_PRODUCT_SUCCESS } from "../consents/productConsents.js";

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const { data } = await axios.get(`/api/v1/me`);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred";

    dispatch({
      type: LOGIN_USER_FAIL,
      payload: errorMessage,
    });
  }
};
export const logoutUser= () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/Logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.err
        ? error.response.data.err
        : "An error occurred";

    dispatch({
      type: LOGOUT_FAIL,
      payload: errorMessage,
    });
  }
};

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    dispatch({ type: USER_SUCCESS, payload: data.user });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.err
        ? error.response.data.err
        : "Please login";

    dispatch({
      type: USER_FAIL,
      payload: errorMessage,
    });
  }
};

export const userSignUp = (name,phoneNo,email,password) => async (
  dispatch
) => {
  try {
    dispatch({ type: USER_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post("/api/v1/register", {name,phoneNo,email,password},config);

    dispatch({ type: USER_SUCCESS, payload: data.user });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.err
        ? error.response.data.err
        : "please SignUp";

    dispatch({
      type: USER_FAIL,
      payload: errorMessage,
    });
  }
};

export const updateProfile = (name,phoneNo,newEmail,oldEmail,password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.put("/api/v1/me/update", {name,phoneNo,newEmail,oldEmail,password},config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.err
        ? error.response.data.err
        : "An error occurred";

    dispatch({
      type: UPDATE_USER_FAIL,
      payload: errorMessage,
    });
  }
};
export const updatePassword = (oldpassword, newpassword,confirmpassword) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/password/update",
      { oldpassword, newpassword,confirmpassword },
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.err
        ? error.response.data.err
        : error.message || "An error occurred";

    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: errorMessage,
    });
  }
};
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({type:FORGOT_PASSWORD_REQUEST});
    const config = { headers: { "Content-type": "application/json" } };
    const {data} = await axios.post("/api/v1/password/forgot",{email},config);
    dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.success});
  }catch(error)  {
    console.log(`first errror  ${error}`);
    const errorMessage =
    error.response && error.response.data && error.response.data.err
      ? error.response.data.err
      : error.message || "An error occurred";

  dispatch({
    type: FORGOT_PASSWORD_FAIL,
    payload: errorMessage,
  });
  }
}

export const getAllUser =()=> async(dispatch)=>{
try{
  dispatch({type:ADMIN_GET_ALL_USER_REQUEST});
  const {data} = await axios.get("/api/v1/admin/users");
  dispatch({type:ADMIN_GET_ALL_USER_SUCCESS,payload:data.user});
  }catch(error) {
    const errorMessage = error.response && error.response.data && error.response.data.err
    dispatch({type:ADMIN_GET_ALL_USER_FAIL,payload:errorMessage});
  }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export const deleteUser = (id) => async (dispatch) => {
  try{
    dispatch({type:DELETE_USER_REQUEST});
    const {data} = await axios.delete(`/api/v1/admin/users/${id}`);
    dispatch({type:DELETE_USER_SUCCESS,payload:data.success});
  }catch(error){
    const errorMessage = error.response && error.response.data && error.response.data.err
    dispatch({type:DELETE_USER_FAIL,payload:errorMessage});
  }
}
