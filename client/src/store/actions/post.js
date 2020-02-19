import axios from "axios";

import { ADD_POST, GET_ERRORS } from "./types";

export const addPost = post => dispatch => {
  axios
    .post("/api/posts", post)
    .then(res =>
      dispatch({
        type: ADD_POST,
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

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
