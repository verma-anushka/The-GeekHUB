import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { facebookAuth } from "../../store/actions/auth";

class FacebookAuth extends Component {
  responseFacebook = response => {
    // console.log(response);
    const firstName = response.name.trim().split(" ")[0];
    const lastName = response.name.trim().split(" ")[1];

    this.props.facebookAuth(
      {
        userID: response.userID,
        firstname: firstName,
        lastname: lastName,
        accessToken: response.accessToken
      },
      this.props.history
    );
  };
  render() {
    return (
      <div className="pb-3">
        <FacebookLogin
          appId="611797826283955"
          autoLoad={false}
          callback={this.responseFacebook}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              className="btn btn-primary btn-lg"
            >
              <i className="fab fa-facebook pr-2"></i> Login with Facebook
            </button>
          )}
        />
      </div>
    );
  }
}

FacebookAuth.propTypes = {
  errors: PropTypes.object.isRequired,
  facebookAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { facebookAuth })(
  withRouter(FacebookAuth)
);
