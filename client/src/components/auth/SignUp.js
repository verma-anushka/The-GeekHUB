import React, { Component } from "react";
// import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../TextFieldGroup";

import { signUpUser } from "../../store/actions/auth";

class SignUp extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {}
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword
    };
    this.props.signUpUser(newUser, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="SignUp">
        <div>SIGNUP</div>
        <section className="container">
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          <form noValidate className="form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              placeholder="Firstname"
              name="firstname"
              error={errors.firstname}
              value={this.state.firstname}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="text"
              placeholder="Lastname"
              name="lastname"
              error={errors.lastname}
              value={this.state.lastname}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="text"
              placeholder="Username"
              name="username"
              error={errors.username}
              value={this.state.username}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="email"
              placeholder="Email Address"
              name="email"
              error={errors.email}
              value={this.state.email}
              onChange={this.onChange}
            />
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
            <input type="submit" className="btn btn-primary" value="signup" />
          </form>
          <p className="my-1">
            Already have an account? <a href="signin.html">Sign In</a>
          </p>
        </section>
      </div>
    );
  }
}

SignUp.propTypes = {
  errors: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { signUpUser })(withRouter(SignUp));
