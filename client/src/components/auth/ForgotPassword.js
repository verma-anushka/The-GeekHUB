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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div style={{ marginTop: "10%" }} className="forgot-password">
        <h4 style={{ color: "#fff" }} className="large">
          Forgot your account password?! Reset it with just a click!
        </h4>
        <form className="form" onSubmit={this.onSubmit}>
          {/* <p className="lead">
            <i className="fas fa-user"></i> Enter your email address
          </p> */}
          <TextFieldGroup
            type="email"
            placeholder="Email Address"
            name="email"
            error={errors.email}
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            className="btn btn-outline-primary"
            type="submit"
            value="Send Link"
          />
        </form>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  errors: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { forgotPassword })(
  withRouter(ForgotPassword)
);
