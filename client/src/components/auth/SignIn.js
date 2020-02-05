import React, { Component } from "react";
import classnames from "classnames";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { errors } = this.state;

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
                placeholder="Email Address"
                name="email"
                className={classnames({ "is-invalid": errors.email })}
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

export default SignIn;
