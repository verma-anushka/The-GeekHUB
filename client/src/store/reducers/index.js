import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";

console.log(errorReducer);
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
