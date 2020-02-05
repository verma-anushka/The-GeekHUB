import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
// import SignUp from "../auth/SignUp";
// import SignIn from "../auth/SignIn";

class NavBar extends Component {
  render() {
    return (
      <nav role="navigation" className="navbar navbar-custom navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              TheGeekHub
            </Link>

            <button
              type="button"
              className="navbar-toggle"
              data-target="#navbarCollapse"
              data-toggle="collapse"
            >
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div className="navbar-collapse collapse" id="navbarCollapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/Geeks">Geeks</Link>
              </li>
              <li>
                <Link to="/Posts">Posts</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign-Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign-In</Link>
              </li>
              <li>
                <Link to="/geeks">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
