import { combineReducers } from "redux";
import authReducer from "./auth";
import profileReducer from "./profile";
import postReducer from "./post";
import errorReducer from "./error";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  errors: errorReducer
});
