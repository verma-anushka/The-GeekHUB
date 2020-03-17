import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../../formInputs/TextFieldGroup";
import TextAreaFieldGroup from "../../formInputs/TextAreaFieldGroup";
import { addExperience } from "../../../store/actions/profile";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      organization: "",
      location: "",
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

    const experience = {
      organization: this.state.organization,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(experience, this.props.history);
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
      <div style={{ marginTop: "10%" }} className="add-experience">
        <div className="row">
          <div className="col-md-8 m-auto">
            {/* <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link> */}
            <h3 className="display-4 text-center">Add Experience</h3>

            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-xl-12 col-md-12 mb-30">
                  <TextFieldGroup
                    placeholder="Organization*"
                    name="organization"
                    value={this.state.organization}
                    onChange={this.onChange}
                    error={errors.organization}
                  />
                </div>
                <div className="col-xl-6 col-md-6 mb-30">
                  <TextFieldGroup
                    placeholder="Job Title*"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                  />
                </div>
                <div className="col-xl-6 col-md-6 mb-30">
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
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
              <TextAreaFieldGroup
                placeholder="Description"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
