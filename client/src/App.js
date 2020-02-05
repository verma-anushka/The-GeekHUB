import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import HomePage from "./components/layout/HomePage";
import Footer from "./components/layout/Footer";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Route exact path="/" component={HomePage} />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
