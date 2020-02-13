import React, { Component } from "react";
// import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../formInputs/TextFieldGroup";
// import jwt from "jsonwebtoken";

import { resetPassword } from "../../store/actions/auth";

class ResetPassword extends Component {
  state = {
    firstname: "",
    // lastname: "",
    username: "",
    token: "",
    password: "",
    confirmpassword: "",
    errors: {}
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    const reset = {
      resetPasswordToken: this.state.token,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword
    };
    this.props.resetPassword(reset, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount = () => {
    const { token } = this.props.match.params;

    // console.log(token);
    // const { firstname } = jwt.decode(token);
    if (token) {
      this.setState({ token: token });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;
    // console.log(errors);
    return (
      <div className="SignUp">
        <section className="container">
          <h1 className="large text-primary">ResetPassword</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Reset
          </p>
          <form noValidate className="form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="password"
              placeholder="Password"
              name="password"
              error={errors.password}
              value={this.state.password}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              error={errors.confirmpassword}
              value={this.state.confirmpassword}
              onChange={this.onChange}
            />
            <input type="submit" className="btn btn-primary" value="reset" />
          </form>
        </section>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  errors: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { resetPassword })(
  withRouter(ResetPassword)
);
