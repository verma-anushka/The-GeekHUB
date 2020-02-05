import isEmpty from "../../validation/isEmpty";
import { SET_CURRENT_USER } from "../actions/types";
const initialState = {
  isAuthenticated: null,
  user: null
};

export default function(state = initialState, action) {
  // console.log(state);
  switch (action.type) {
    case SET_CURRENT_USER:
      // action.payload has all the user data
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
