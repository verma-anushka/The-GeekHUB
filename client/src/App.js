import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import HomePage from "./components/layout/HomePage";
import Footer from "./components/layout/Footer";

import "./App.css";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";

const App = () => {
  return (
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
  );
};

export default App;