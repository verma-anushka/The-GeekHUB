import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { googleOAuth } from "../../store/actions/auth";

class GoogleOAuth extends Component {
  responseGoogle = response => {
    this.props.googleOAuth({ idToken: response.tokenId }, this.props.history);
  };
  render() {
    return (
      <GoogleLogin
        // clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        clientId="442853635832-l520hhe92m6ofue2k1t5pbtt0m9ibpfq.apps.googleusercontent.com"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn google"
          >
            <i className="fab fa-google"></i>
          </button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    );
  }
}

GoogleOAuth.propTypes = {
  errors: PropTypes.object.isRequired,
  googleOAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { googleOAuth })(
  withRouter(GoogleOAuth)
);
