import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import zxcvbn from "zxcvbn";
import GoogleOAuth from "./GoogleOAuth";
import FacebookAuth from "./FacebookAuth";
import TextFieldGroup from "../formInputs/TextFieldGroup";

import { signUpUser, signInUser } from "../../store/actions/auth";
import "../../assets/styles/components/auth/signup.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      errors: {},
      type: "input",
      score: "null",
      form: "signin"
    };
    this.toggle = {
      signin: "signup",
      signup: "signin"
    };
    this.showHide = this.showHide.bind(this);
    this.passwordStrength = this.passwordStrength.bind(this);
  }

  showHide(event) {
    console.log(this.state.type);
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }

  passwordStrength(event) {
    this.setState({ [event.target.name]: event.target.value });

    if (event.target.value === "") {
      this.setState({
        score: "null"
      });
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState({
        score: pw.score
      });
    }
  }

  onSignupSubmit = event => {
    // console.log("onSignupSubmit");
    event.preventDefault();
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

  onSigninSubmit = event => {
    // console.log("onSigninSubmit");
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.signInUser(user);
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
    console.log(errors);

    const { form } = this.state;
    return (
      <div className="auth">
        <div
          className={classnames("cont", form === "signup" ? "s--signup" : "")}
        >
          {this.state.form === "signin" && (
            <div className="form sign-in">
              <h2>Sign In!</h2>
              <div style={{ textAlign: "center", marginBottom: "35px" }}>
                <GoogleOAuth />
                <FacebookAuth />
              </div>
              <hr />
              <form onSubmit={this.onSigninSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  error={errors.email}
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type={this.state.type}
                  placeholder="password"
                  name="password"
                  error={errors.password}
                  value={this.state.password}
                  onChange={this.passwordStrength}
                />
                <span onClick={this.showHide}>
                  <i
                    className={classnames(
                      "password__show fas",
                      this.state.type === "input" ? "fa-eye" : "fa-eye-slash"
                    )}
                  ></i>
                </span>
                <span
                  className="password__strength"
                  data-score={this.state.score}
                />
                <input type="submit" className="submit" value="Sign In" />
              </form>
              <div className="forgot">
                <Link to={"/forgot-password"}>Forgot Password</Link>
              </div>
            </div>
          )}
          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h2>New here?</h2>
                <p>Sign up and find your fellow geeks!</p>
              </div>
              <div className="img__text m--in">
                <h2>Already registered?</h2>
                <p>If you already has an account, just sign in.!</p>
              </div>
              <button
                className="span img__btn m--up"
                onClick={() => {
                  this.setState({
                    form: this.toggle[this.state.form],
                    password: "",
                    score: "null"
                  });
                }}
              >
                {this.toggle[this.state.form]}
              </button>
            </div>
            {this.state.form === "signup" && (
              <div className="form sign-up">
                <h2>Sign Up!</h2>
                <div style={{ textAlign: "center" }}>
                  <GoogleOAuth />
                  <FacebookAuth />
                </div>
                <hr />
                <form noValidate onSubmit={this.onSignupSubmit}>
                  <div className="row">
                    <div className="col-xl-3 col-md-3 mb-30">
                      <TextFieldGroup
                        type="text"
                        placeholder="Firstname"
                        name="firstname"
                        error={errors.firstname}
                        value={this.state.firstname}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-xl-3 offset-xl-3 col-md-3 offset-md-3 mb-30">
                      <TextFieldGroup
                        type="text"
                        placeholder="Lastname"
                        name="lastname"
                        error={errors.lastname}
                        value={this.state.lastname}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-md-3 mb-30">
                      <TextFieldGroup
                        type="text"
                        placeholder="Username"
                        name="username"
                        error={errors.username}
                        value={this.state.username}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-xl-3 offset-xl-3 col-md-3 offset-md-3 mb-30">
                      <TextFieldGroup
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        error={errors.email}
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-md-3 mb-30">
                      <TextFieldGroup
                        type="password"
                        placeholder="Password"
                        name="password"
                        error={errors.password}
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      <span onClick={this.showHide}>
                        <i
                          className={classnames(
                            "password__show fas",
                            this.state.type === "input"
                              ? "fa-eye"
                              : "fa-eye-slash"
                          )}
                        ></i>
                      </span>
                      <span
                        className="password__strength"
                        data-score={this.state.score}
                      />
                    </div>
                    <div className="col-xl-3 offset-xl-3 col-md-3 offset-md-3 mb-30">
                      <TextFieldGroup
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmpassword"
                        error={errors.confirmpassword}
                        value={this.state.confirmpassword}
                        onChange={this.onChange}
                      />
                      <span onClick={this.showHide}>
                        <i
                          className={classnames(
                            "password__show fas",
                            this.state.type === "input"
                              ? "fa-eye"
                              : "fa-eye-slash"
                          )}
                        ></i>
                      </span>
                      <span
                        className="password__strength"
                        data-score={this.state.score}
                      />
                    </div>
                  </div>
                  <input type="submit" className="submit" value="Sign Up" />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  errors: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { signUpUser, signInUser })(
  withRouter(SignUp)
);
