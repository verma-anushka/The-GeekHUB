import axios from "axios";

import { POST_LOADING } from "./types";

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
