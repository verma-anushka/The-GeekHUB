import isEmpty from "../../validation/isEmpty";
import { SET_CURRENT_USER, ACTIVATE_USER } from "../actions/types";
const initialState = {
  isAuthenticated: null,
  user: null,
  token: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      // action.payload has all the user data
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    }
    case ACTIVATE_USER: {
      return {
        ...state,
        token: action.payload
      };
    }
    default:
      return state;
  }
}
