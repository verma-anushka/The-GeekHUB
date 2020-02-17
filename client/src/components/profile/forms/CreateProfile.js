import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../../formInputs/TextFieldGroup";
import TextAreaFieldGroup from "../../formInputs/TextAreaFieldGroup";
import InputGroup from "../../formInputs/InputGroup";
import SelectListGroup from "../../formInputs/SelectListGroup";
import { createProfile } from "../../../store/actions/profile";
import Uploader from "../display/Uploader";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      organization: "",
      websiteLink: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      githubUsername: "",
      linkedin: "",
      medium: "",
      behance: "",
      github: "",
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: "",
      displaySocialInputs: false, // toggle option
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const { user } = this.props.auth;
    console.log(user);
    const profile = {
      handle: this.state.handle,
      organization: this.state.organization,
      websiteLink: this.state.websiteLink,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      githubUsername: this.state.githubUsername,
      linkedin: this.state.linkedin,
      medium: this.state.medium,
      behance: this.state.behance,
      github: this.state.github,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profile, user, this.props.history);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="medium Profile URL"
            name="medium"
            icon="fab fa-medium"
            value={this.state.medium}
            onChange={this.onChange}
            error={errors.medium}
          />
          <InputGroup
            placeholder="behance Profile URL"
            name="behance"
            icon="fab fa-behance"
            value={this.state.behance}
            onChange={this.onChange}
            error={errors.behance}
          />

          <InputGroup
            placeholder="github Channel URL"
            name="github"
            icon="fab fa-github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student", value: "Student" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <h1 style={{ marginTop: "20%" }}>cp</h1>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user" />
          Add your profile info..
        </p>
        <Uploader />

        <small>* = required field</small>
        <form className="form" onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="User handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            moreInfo="..."
          />
          <SelectListGroup
            placeholder="Status"
            name="status"
            value={this.state.status}
            onChange={this.onChange}
            options={options}
            error={errors.status}
            moreInfo="Give us an idea of where you are at in your career"
          />

          <TextFieldGroup
            placeholder="Org"
            name="organization"
            value={this.state.organization}
            onChange={this.onChange}
            error={errors.organization}
            moreInfo="Could be your own organization or one you work for"
          />

          <TextFieldGroup
            placeholder="Website URL"
            name="websiteLink"
            value={this.state.websiteLink}
            onChange={this.onChange}
            error={errors.websiteLink}
            moreInfo="Could be your own website or a company one"
          />

          <TextFieldGroup
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
            moreInfo="City or city & state suggested (eg. Boston, MA)"
          />

          <TextFieldGroup
            placeholder="* Skills"
            name="skills"
            value={this.state.skills}
            onChange={this.onChange}
            error={errors.skills}
            moreInfo="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
          />
          <TextFieldGroup
            placeholder="Github Username"
            name="githubUsername"
            value={this.state.githubUsername}
            onChange={this.onChange}
            error={errors.githubUsername}
            moreInfo="If you want your latest repos and a Github link, include your username"
          />

          <TextAreaFieldGroup
            placeholder="Short Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
            moreInfo="Tell us a little about yourself"
          />

          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                // Toggle feature
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }));
              }}
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span className="text-muted">Optional</span>
          </div>
          {socialInputs}
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
