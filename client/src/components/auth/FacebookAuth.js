import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { facebookAuth } from "../../store/actions/auth";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

class FacebookAuth extends Component {
  responseFacebook = response => {
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
      <FacebookLogin
        appId="611797826283955"
        autoLoad={false}
        callback={this.responseFacebook}
        render={renderProps => (
          <button onClick={renderProps.onClick} className="btn facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
        )}
      />
    );
  }
}

FacebookAuth.propTypes = {
  errors: PropTypes.object.isRequired,
  facebookAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { facebookAuth })(
  withRouter(FacebookAuth)
);
