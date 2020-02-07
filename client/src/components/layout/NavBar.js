import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../store/actions/auth";
import { clearCurrentProfile } from "../../store/actions/profile";

class NavBar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a
            href="#logout.html"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            {/* <img src={user.avatar} alt={user.name} title="Gravatar image" /> */}
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/signup">Sign-Up</Link>
        </li>
        <li>
          <Link to="/signin">Sign-In</Link>
        </li>
      </ul>
    );
    return (
      <nav role="navigation" className="navbar navbar-custom navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              GoGeeks
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
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
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
  NavBar
);
