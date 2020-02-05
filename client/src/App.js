import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/auth";
import store from "./store";

import "./App.css";

import NavBar from "./components/layout/NavBar";
import HomePage from "./components/layout/HomePage";
import Footer from "./components/layout/Footer";

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token to get user data
  const decodedUser = jwtDecode(localStorage.jwtToken);
  // Set current user
  store.dispatch(setCurrentUser(decodedUser));

  // Check for expiration
  const currentTime = Date.now() / 1000;
  if (currentTime < decodedUser.exp) {
    // Logout the user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/signin";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavBar />
            <Route exact path="/" component={HomePage} />
            <div className="container">
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
