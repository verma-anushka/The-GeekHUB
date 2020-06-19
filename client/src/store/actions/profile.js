import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from "./types";

// ACTION CREATOR TO GET THE CURRENT LOGGED IN USER'S PROFILE
export const getCurrentProfile = id => dispatch => {
  // dispatch the loading spinner while the profile is being fetched
  dispatch(setProfileLoading());
  // try {
  // api request to server to fetch the user profile
  axios
    .get(`/api/profile?id=${id}`)
    .then(res => {
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
  axios
    .post("/api/profile", profile)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      // console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // error msgs
      });
    });
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

// ACTION CREATOR TO DELETE THE USER PROFILE AND USER ACCOUNT
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        // request successful
        dispatch({
          type: SET_CURRENT_USER,
          payload: {} // a logged in user always need to exist
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// ACTION CREATOR TO ADD THE EXPERIENCE SECTION OF THE USER PROFILE
export const addExperience = (experience, history) => dispatch => {
  // console.log(experience);
  axios
    .post("/api/profile/experience", experience)
    .then(res => {
      // request successful
      history.push("/dashboard");
    })
    .catch(err =>
      // request unsuccessful
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// ACTION CREATOR TO ADD THE EDUCATION SECTION OF THE USER PROFILE
export const addEducation = (education, history) => dispatch => {
  axios
    .post("/api/profile/education", education)
    .then(res => {
      // request successful
      history.push("/dashboard");
    })
    .catch(err =>
      // request unsuccessful
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// ACTION CREATOR TO DELETE THE EDUCATION SECTION OF THE USER PROFILE
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data // profile with deleted exp
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// ACTION CREATOR TO DELETE THE EDUCATION SECTION OF THE USER PROFILE
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// ACTION CREATOR TO GET ALL THE USER PROFILES
export const getProfiles = (query, cancelToken) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/allprofiles?search=${query}`, {
      cancelToken: cancelToken
    })
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// ACTION CREATOR TO GET THE USER PROFILE BASED ON THE USER HANDLE
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

// ACTION CREATOR TO FOLLOW A USER
export const follow = id => dispatch => {
  axios
    .post(`/api/profile/follow/${id}`)
    .then(res => {
      dispatch(getCurrentProfile(id));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// ACTION CREATOR TO UNFOLLOW A USER
export const unfollow = id => dispatch => {
  axios
    .post(`/api/profile/unfollow/${id}`)
    .then(res => {
      dispatch(getCurrentProfile(id));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// // ACTION CREATOR TO UPLOAD THE USER IMAGE
// export const uploadImg = () => dispatch => {
//   // dispatch(setProfileLoading());
//   axios
//     .post("/api/profile/uploadImg")
//     .then(res => {
//       // console.log(res);
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       console.log(err);

//       dispatch({
//         type: GET_PROFILE,
//         payload: null
//       });
//     });
// };
