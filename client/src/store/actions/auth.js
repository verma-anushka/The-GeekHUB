import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const signUpUser = (newUser, history) => dispatch => {
  // console.log(newUser);
  axios
    .post("/api/users/signup", newUser)
    .then(res => {
      history.push("/signup");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Activate account
export const activateAccount = (token, history) => dispatch => {
  // console.log(token);
  axios
    .post("/api/users/activate-account", token)
    .then(res => {
      history.push("/signin");
    })
    .catch(err => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// google auth login
export const googleOAuth = (token, history) => dispatch => {
  // console.log(token);
  axios
    .post("/api/users/google-login", token)
    .then(res => {
      // Get Token
      const { token } = res.data;
      // Save token in Local Storage
      localStorage.setItem("jwtToken", token);
      // Set token to authorization header
      setAuthToken(token);
      // Decode token to get user data
      const decodedUser = jwtDecode(token);
      // console.log(decodedUser);
      // Set current user
      dispatch(setCurrentUser(res.data.user));
      // console.log("google oauth");
      // console.log(res);
      // history.push("/dashboard");
    })
    .catch(err => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// forgot password
export const forgotPassword = (email, history) => dispatch => {
  // console.log(token);
  axios
    .post("/api/users/forgot-password", email)
    .then(res => {
      console.log("forgot password" + res);
      history.push("/forgot-password");
    })
    .catch(err => {
      // console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Reset password
export const resetPassword = (reset, history) => dispatch => {
  // console.log(reset);
  axios
    .put("/api/users/reset-password", reset)
    .then(res => {
      // console.log(res);
      history.push("/signin");
    })
    .catch(err => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Signin User: Token
export const signInUser = user => dispatch => {
  axios
    .post("/api/users/signin", user)
    .then(res => {
      // Get Token
      const { token } = res.data;
      // Save token in Local Storage
      localStorage.setItem("jwtToken", token);
      // Set token to authorization header
      setAuthToken(token);
      // Decode token to get user data
      const decodedUser = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decodedUser));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set current user
export const setCurrentUser = decodedUser => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  };
};

// Logout User
export const logoutUser = () => dispatch => {
  // Remove token from Local Storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to null
  dispatch(setCurrentUser({}));
};
