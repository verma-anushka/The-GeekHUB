import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Setting default header for axios
    axios.defaults.headers.common["Authorization"] = token; // attach the token to every request
  } else {
    delete axios.defaults.headers.common["Authorization"]; // delete the token from the auth header
  }
};

export default setAuthToken;
