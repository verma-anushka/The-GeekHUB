import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../store/actions/auth";
import { clearCurrentProfile } from "../../store/actions/profile";
import "../../assets/styles/components/layout/NavBar.scss";

class NavBar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  isActive = path => {
    if (this.props.match.path === path) {
      return { color: "red" };
    } else {
      return { color: "blue" };
    }
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav py-4 py-md-0">
          <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
            <Link
              to="/profiles"
              style={this.isActive("/profiles")}
              className="nav-link"
            >
              TheGeekHUB
            </Link>
          </li>
          <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
            <Link
              to="/feed"
              style={this.isActive("/feed")}
              className="nav-link"
            >
              Posts
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto py-4 py-md-0">
          <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
            <Link
              to="/dashboard"
              style={this.isActive("/dashboard")}
              className="nav-link"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
            <a
              href="#logout.html"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              {/* <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                title="Profile image"
                style={{ height: "25px", width: "25px", marginRight: "5px" }}
              /> */}
              Logout
            </a>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav py-4 py-md-0">
          <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
            <Link
              to="/profiles"
              style={this.isActive("/profiles")}
              className="nav-link"
            >
              TheGeekHUB
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto py-4 py-md-0">
          <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
            <Link
              to="/signup"
              style={this.isActive("/signup")}
              className="nav-link"
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
            <Link
              to="/signin"
              style={this.isActive("/signin")}
              className="nav-link"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <div className="navigation-wrap bg-light start-header start-style dark">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link
                  to="/"
                  style={this.isActive("/")}
                  className="navbar-brand nav-link"
                >
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/logo.svg"
                    alt=""
                  />
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                {/* <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                > */}

                {isAuthenticated ? authLinks : guestLinks}
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  withRouter(NavBar)
);
