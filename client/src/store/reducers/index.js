import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
