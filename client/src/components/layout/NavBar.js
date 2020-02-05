import React, { Component } from "react";
import "./NavBar.scss";

class NavBar extends Component {
  render() {
    return (
      <nav role="navigation" className="navbar navbar-custom navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">
              Go Geeks
            </a>

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
                <a href="geeks.html">Geeks</a>
              </li>
              <li>
                <a href="posts.html">Posts</a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="geeks.html">Sign-Up</a>
              </li>
              <li>
                <a href="geeks.html">Sign-In</a>
              </li>
              <li>
                <a href="geeks.html" data-toggle="modal">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
