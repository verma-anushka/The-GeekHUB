import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../../formInputs/TextFieldGroup";
import TextAreaFieldGroup from "../../formInputs/TextAreaFieldGroup";
import InputGroup from "../../formInputs/InputGroup";
import SelectListGroup from "../../formInputs/SelectListGroup";
import {
  createProfile,
  getCurrentProfile
} from "../../../store/actions/profile";
import isEmpty from "../../../validation/isEmpty";

import ImageUpload from "../../imageUpload/ImageUpload";

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
      errors: {},
      selectedFile: null
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile(this.props.auth.user.id);
  
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(",");

      // If profile field doesnt exist, make empty string
      profile.organization = !isEmpty(profile.organization)
        ? profile.organization
        : "";
      profile.websiteLink = !isEmpty(profile.websiteLink)
        ? profile.websiteLink
        : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubUsername = !isEmpty(profile.githubUsername)
        ? profile.githubUsername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.socialLinks = !isEmpty(profile.socialLinks)
        ? profile.socialLinks
        : {};
      profile.linkedin = !isEmpty(profile.socialLinks.linkedin)
        ? profile.socialLinks.linkedin
        : "";
      profile.medium = !isEmpty(profile.socialLinks.medium)
        ? profile.socialLinks.medium
        : "";
      profile.behance = !isEmpty(profile.socialLinks.behance)
        ? profile.socialLinks.behance
        : "";
      profile.github = !isEmpty(profile.socialLinks.github)
        ? profile.socialLinks.github
        : "";
      profile.youtube = !isEmpty(profile.socialLinks.youtube)
        ? profile.socialLinks.youtube
        : "";
      profile.twitter = !isEmpty(profile.socialLinks.twitter)
        ? profile.socialLinks.twitter
        : "";
      profile.facebook = !isEmpty(profile.socialLinks.facebook)
        ? profile.socialLinks.facebook
        : "";
      profile.instagram = !isEmpty(profile.socialLinks.instagram)
        ? profile.socialLinks.instagram
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        organization: profile.organization,
        websiteLink: profile.websiteLink,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        bio: profile.bio,
        githubUsername: profile.githubUsername,
        linkedin: profile.linkedin,
        medium: profile.medium,
        behance: profile.behance,
        github: profile.github,
        youtube: profile.youtube,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram
      });
    }
  }

  onSubmit = event => {
    event.preventDefault();
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

    this.props.createProfile(profile, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
            placeholder="Medium Profile URL"
            name="medium"
            icon="fab fa-medium"
            value={this.state.medium}
            onChange={this.onChange}
            error={errors.medium}
          />
          <InputGroup
            placeholder="Behance Profile URL"
            name="behance"
            icon="fab fa-behance"
            value={this.state.behance}
            onChange={this.onChange}
            error={errors.behance}
          />

          <InputGroup
            placeholder="Github Channel URL"
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

    const options = [
      { label: "Select Professional Status*", value: 0 },
      { label: "Student", value: "Student" },
      { label: "Intern", value: "Intern" },
      { label: "Software Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Professor", value: "Professor" },
      { label: "Lecturer", value: "Lecturer" },
      { label: "Instructor", value: "Instructor" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile" style={{ marginTop: "10%" }}>
        <h3 style={{ textAlign: "center" }}>Edit profile</h3>

        {/* <Link to="/dashboard" className="btn btn-light">
          Go Back
        </Link> */}

        <form className="form" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-xl-6 col-md-6 mb-30">
              <span>Upload banner image</span>
              <ImageUpload type="banner" />
            </div>
            <div className="col-xl-6 col-md-6 mb-30">
              <span>Upload profile image</span>
              <ImageUpload type="avatar" />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-6 mb-30">
              <TextFieldGroup
                placeholder="User handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
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
              <TextFieldGroup
                placeholder="Organization"
                name="organization"
                value={this.state.organization}
                onChange={this.onChange}
                error={errors.organization}
              />
            </div>
            <div className="col-xl-6 col-md-6 mb-30">
              <TextFieldGroup
                placeholder="Website URL"
                name="websiteLink"
                value={this.state.websiteLink}
                onChange={this.onChange}
                error={errors.websiteLink}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-6 mb-30">
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                moreInfo="Please use comma separated values"
              />
            </div>
            <div className="col-xl-6 col-md-6 mb-30">
              <TextFieldGroup
                placeholder="Github Username"
                name="githubUsername"
                value={this.state.githubUsername}
                onChange={this.onChange}
                error={errors.githubUsername}
              />
            </div>
          </div>

          <span style={{ textAlign: "left" }}>About</span>
          <TextAreaFieldGroup
            className="bio"
            placeholder=""
            name="bio"
            style={{ marginBottom: "1rem" }}
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
          />
          <div className="row">
            <div className="col-xl-6 col-md-6 mb-30">
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                options={options}
                error={errors.status}
              />
            </div>

            <div className="col-xl-6 col-md-6 mb-30">
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                  className="select"
                >
                  Add Social Network Links
                </button>
              </div>
              {socialInputs}
            </div>
          </div>
          <input type="submit" value="Submit" className="btn btn-info mt-4" />
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
