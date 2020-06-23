import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: false
};

export default function(state = initialState, action) {
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
    case GET_PROFILES:
      return {
        ...state,
        loading: false, // stop the spinner
        profiles: action.payload // user profiles
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
