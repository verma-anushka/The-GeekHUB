// ----------------------------------------- commit 6 conditional classes error handling incomplete
import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

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

    axios
      .post("/api/users/signup", newUser)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
            <div className="form-group">
              <input
                type="text"
                placeholder="Firstname"
                name="firstname"
                className={classnames({ "is-invalid": errors.firstname })}
                value={this.state.firstname}
                onChange={this.onChange}
              />
              {errors.firstname && (
                <div className="invalid-feedback">{errors.firstname}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Lastname"
                name="lastname"
                className={classnames({ "is-invalid": errors.lastname })}
                value={this.state.lastname}
                onChange={this.onChange}
              />
              {errors.lastname && (
                <div className="invalid-feedback">{errors.lastname}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className={classnames({ "is-invalid": errors.username })}
                value={this.state.username}
                onChange={this.onChange}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                className={classnames({ "is-invalid": errors.confirmpassword })}
                value={this.state.confirmpassword}
                onChange={this.onChange}
              />
              {errors.confirmpassword && (
                <div className="invalid-feedback">{errors.confirmpassword}</div>
              )}
            </div>
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

export default SignUp;
