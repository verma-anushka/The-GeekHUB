import axios from "axios";

const setAuthToken = token => {
  // Setting default header for axios
  if (token) {
    // attach the token to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete the token from the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
