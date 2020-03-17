import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../formInputs/TextFieldGroup";
import { resetPassword } from "../../store/actions/auth";

class ResetPassword extends Component {
  state = {
    firstname: "",
    username: "",
    token: "",
    password: "",
    confirmpassword: "",
    errors: {}
  };

  onSubmit = event => {
    event.preventDefault();
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
    return (
      <div style={{ marginTop: "10%" }} className="reset-password">
        <h3 style={{ color: "#fff" }} className="large">
          Reset your account password
        </h3>
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
          <input
            type="submit"
            className="btn btn-outline-primary"
            value="Reset Password"
          />
        </form>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  errors: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { resetPassword })(
  withRouter(ResetPassword)
);
