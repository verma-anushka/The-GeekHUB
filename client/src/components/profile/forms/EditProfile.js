import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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
      errors: {},
      selectedFile: null
    };
  }

  // fileChangedHandler = event => {
  //   this.setState({ selectedFile: event.target.files[0] });
  // };

  // uploadHandler = () => {
  //   console.log(this.state.selectedFile);
  //   const formData = new FormData();
  //   formData.append(
  //     "myFile",
  //     this.state.selectedFile,
  //     this.state.selectedFile.name
  //   );
  //   axios.post("/file-upload", formData, {
  //     onUploadProgress: progressEvent => {
  //       console.log(progressEvent.loaded / progressEvent.total);
  //     }
  //   });
  // };

  componentDidMount() {
    // console.log(this.props.profile);
    // console.log(this.props.auth.user.id);
    this.props.getCurrentProfile(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      // console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // console.log(nextProps.profile);
      // console.log(nextProps.profile.profile);
      // array -> CSV
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
    // console.log(this.state);
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
    console.log(this.props.auth);
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
        <h1 style={{ marginTop: "20%" }} className="large text-primary">
          Edit Profile
        </h1>
        <Link to="/dashboard" className="btn btn-light">
          Go Back
        </Link>

        <img
          src={this.props.auth.user.avatar}
          alt={this.props.auth.user.username}
          style={{ width: "180px", height: "180px" }}
        />

        <Uploader />
        {/* <input type="file" onChange={this.fileChangedHandler} />
        <button onClick={this.uploadHandler}>Upload!</button> */}

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
            moreInfo="Could be your own website or a organization one"
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
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
