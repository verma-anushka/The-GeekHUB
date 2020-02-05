import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

import "./App.css";

import NavBar from "./components/layout/NavBar";
import HomePage from "./components/layout/HomePage";
import Footer from "./components/layout/Footer";

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import { setCurrentUser, logoutUser } from "./store/actions/auth";
import { clearCurrentProfile } from "./store/actions/profile";

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
  if (decodedUser.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
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
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
