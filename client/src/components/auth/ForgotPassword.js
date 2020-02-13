import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { forgotPassword } from "../../store/actions/auth";
import TextFieldGroup from "../formInputs/TextFieldGroup";

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {}
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    const user = {
      email: this.state.email
    };

    this.props.forgotPassword(user, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount = () => {
    const email = {
      email: this.state.email
    };
    this.props.forgotPassword(email, this.props.history);
  };

  componentWillReceiveProps = nextProps => {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="forgot-password">
        <section className="container">
          <h1 className="large text-primary">ForgotPassword</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Enter your email address
          </p>
          <form className="form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="email"
              placeholder="Email Address"
              name="email"
              error={errors.email}
              value={this.state.email}
              onChange={this.onChange}
            />
            <input
              type="submit"
              className="btn btn-primary"
              value="Send Link"
            />
          </form>
        </section>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  errors: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { forgotPassword })(
  withRouter(ForgotPassword)
);
