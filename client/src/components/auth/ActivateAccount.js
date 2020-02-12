import React, { Component } from "react";
// import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import { activateAccount } from "../../store/actions/auth";

class ActivateAccount extends Component {
  state = {
    firstname: "",
    // lastname: "",
    username: "",
    token: "",
    display: true,
    // email: "",
    errors: {}
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    const jwtToken = {
      token: this.state.token
    };
    this.props.activateAccount(jwtToken, this.props.history);
  };

  componentDidMount = () => {
    const { token } = this.props.match.params;

    console.log(token);
    const { firstname } = jwt.decode(token);
    if (token) {
      this.setState({ token: token });
    }
    console.log(token);
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
  };

  //   componentWillReceiveProps = nextProps => {
  //     if (nextProps.errors) {
  //       this.setState({ errors: nextProps.errors });
  //     }
  //   };

  activationLink = () => (
    <div>
      <h4>Hey {this.state.firstname}, Ready to activate your account?</h4>
      <button className="btn btn-outline-primary" onClick={this.onSubmit}>
        Activate my account!
      </button>
    </div>
  );

  render() {
    const { firstname, username, token, display } = this.state;
    return (
      <div className="activate-account" style={{ marginTop: "10%" }}>
        <h4>ActivateAccount</h4>
        {this.activationLink()}
      </div>
    );
  }
}

ActivateAccount.propTypes = {
  errors: PropTypes.object.isRequired,
  activateAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { activateAccount })(
  withRouter(ActivateAccount)
);
