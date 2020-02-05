import axios from "axios";
import { GET_ERRORS } from "./types";

export const signUpUser = (newUser, history) => dispatch => {
  axios
    .post("/api/users/signup", newUser)
    .then(res => {
      history.push("/signin");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
