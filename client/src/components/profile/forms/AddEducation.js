import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../formInputs/TextFieldGroup";
import TextAreaFieldGroup from "../../formInputs/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../../store/actions/profile";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const education = {
      name: this.state.name,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(education, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCheck = event => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div style={{ marginTop: "10%" }} className="add-education">
        <div className="row">
          <div className="col-md-8 m-auto">
            {/* <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link> */}

            <h3 className="display-4 text-center">Add Education</h3>
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-xl-12 col-md-12 mb-30">
                  <TextFieldGroup
                    className="name"
                    placeholder="School/College name*"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                </div>
                <div className="col-xl-6 col-md-6 mb-30">
                  <TextFieldGroup
                    placeholder="Degree*"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                    error={errors.degree}
                  />
                </div>
                <div className="col-xl-6 col-md-6 mb-30">
                  <TextFieldGroup
                    placeholder="Field Of Study"
                    name="fieldOfStudy"
                    value={this.state.fieldOfStudy}
                    onChange={this.onChange}
                    error={errors.fieldOfStudy}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-md-6 mb-30">
                  <h6>From Date</h6>
                  <TextFieldGroup
                    name="from"
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                  />
                </div>
                <div className="col-xl-6 col-md-6 mb-30">
                  <h6>To Date</h6>
                  <TextFieldGroup
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled ? "disabled" : ""}
                  />

                  <div className="form-check mb-4">
                    <input
                      style={{ marginLeft: "40px" }}
                      type="checkbox"
                      className="form-check-input mt-2"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label htmlFor="current" className="form-check-label">
                      Current
                    </label>
                  </div>
                </div>
              </div>
              <span style={{ textAlign: "left" }}>Description</span>
              <TextAreaFieldGroup
                placeholder=""
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about the the position"
              />

              <input
                type="submit"
                value="Submit"
                className="btn btn-info mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
