import axios from "axios";

import {
  GET_PROFILE,
  //   GET_PROFILES,
  PROFILE_LOADING,
  //   GET_ERRORS,
  CLEAR_CURRENT_PROFILE
  //   PROFILE_NOT_FOUND
} from "./types";

// ACTION CREATOR TO GET THE CURRENT LOGGED IN USER'S PROFILE
export const getCurrentProfile = () => dispatch => {
  // dispatch the loading spinner while the profile is being fetched
  dispatch(setProfileLoading());
  try {
    // api request to server to fetch the user profile
    axios
      .post("/api/profile")
      .then(res => {
        // request successful
        dispatch({
          type: GET_PROFILE,
          payload: res.data // user profile
        });
      })
      .catch(err => {
        dispatch({
          // request successful - no profile exists
          type: GET_PROFILE,
          payload: {} // empty profile object
        });
      });
  } catch (err) {
    console.log(err);
  }
};

// ACTION CREATOR TO DISPLAY THE LOADING SPINNER
export const setProfileLoading = () => {
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
