import {
  GET_PROFILE,
  //   GET_PROFILES,
  PROFILE_LOADING,
  //   GET_ERRORS,
  CLEAR_CURRENT_PROFILE
  //   PROFILE_NOT_FOUND
} from "../actions/types";

const initialState = {
  profile: null,
  allProfiles: null,
  loading: false
};

export default function(state = initialState, action) {
  // console.log(state);
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true // start the spinner
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false, // stop the spinner
        profile: action.payload // user profile
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
