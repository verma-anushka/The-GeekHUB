import axios from "axios";

import {
  GET_PROFILE,
  //   GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from "./types";

// ACTION CREATOR TO GET THE CURRENT LOGGED IN USER'S PROFILE
export const getCurrentProfile = () => dispatch => {
  // console.log("get current profile");

  // dispatch the loading spinner while the profile is being fetched
  dispatch(setProfileLoading());
  // try {
  // api request to server to fetch the user profile
  axios
    .get("/api/profile")
    .then(res => {
      console.log(res.data);
      // request successful
      dispatch({
        type: GET_PROFILE,
        payload: res.data // user profile
      });
    })
    .catch(err => {
      console.log(err);

      dispatch({
        // request successful - no profile exists
        type: GET_PROFILE,
        payload: {} // empty profile object
      });
    });
  // } catch (err) {
  //   console.log(err);
  // }
};

// ACTION CREATOR TO CREATE THE USER PROFILE
export const createProfile = (profile, history) => dispatch => {
  // api request to server to create the user profile
  // request successful
  // request unsuccessful
  // console.log(profile);
  axios
    .post("/api/profile", profile)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // error msgs
      });
    });
};

// ACTION CREATOR TO DISPLAY THE LOADING SPINNER
export const setProfileLoading = () => {
  // console.log("profile loading");

  return {
    type: PROFILE_LOADING
    // no payload reqd as no info to be sent
  };
};

// ACTION CREATOR TO REMOVE THE USER PROFILE
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
    // no payload reqd as no info to be sent
  };
};
