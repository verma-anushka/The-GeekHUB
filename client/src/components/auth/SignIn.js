import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { signInUser } from "../../store/actions/auth";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.signInUser(user);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;
    console.log(errors.email);
    console.log(errors.password);
    return (
      <div className="signin">
        <div>SIGNIN</div>
        <section className="container">
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Sign into Your Account
          </p>
          <form className="form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className={classnames({ "is-invalid": errors.email })}
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className={classnames({ "is-invalid": errors.password })}
                value={this.state.password}
                onChange={this.onChange}
              />

              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <a href="register.html">Sign Up</a>
          </p>
        </section>
      </div>
    );
  }
}

SignIn.propTypes = {
  errors: PropTypes.object.isRequired,
  signInUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { signInUser })(SignIn);
