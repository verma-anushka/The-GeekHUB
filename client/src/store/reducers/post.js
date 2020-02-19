import { ADD_POST, GET_POSTS } from "../actions/types";

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
