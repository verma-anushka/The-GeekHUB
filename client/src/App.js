import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import CreateProfile from "./components/profile/forms/CreateProfile";
import EditProfile from "./components/profile/forms/EditProfile";
import AddExperience from "./components/profile/forms/AddExperience";
import AddEducation from "./components/profile/forms/AddEducation";
import ProfileList from "./components/profiles/ProfileList";
import Profile from "./components/profile/display/Profile";
import Posts from "./components/post/display/Posts";
import Post from "./components/post/display/Post";

import PrivateRoute from "./components/PrivateRoute";
import ActivateAccount from "./components/auth/ActivateAccount";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

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
          <NavBar />
          <Route path="/" exact component={HomePage} />
          <Route exact path="/profile/:handle" component={Profile} />
          <Switch>
            <PrivateRoute exact path="/feed" component={Posts} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/post/:id" component={Post} />
          </Switch>
          <div className="container">
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/activate/:token" component={ActivateAccount} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/password/reset/:token"
              component={ResetPassword}
            />
            <Route exact path="/profiles" component={ProfileList} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/createprofile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/editprofile" component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/addexperience"
                component={AddExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/addeducation"
                component={AddEducation}
              />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
