import axios from "axios";
import {
  USER_FAIL,
  USER_REQUEST,
  USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  CLEAR_ERROR,
} from "../consents/userConsent.js";

export const getUserDetails = (id) => async (dispatch) => {
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
        : "An error occurred";

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
        : "An error occurred";

    dispatch({
      type: USER_FAIL,
      payload: errorMessage,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
