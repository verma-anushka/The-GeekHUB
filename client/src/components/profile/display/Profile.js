import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Header from "./Header";
import About from "./About";
import Credentials from "./Credentials";
import GithubProjects from "./projects/github/ProjectList";
import MediumPosts from "./projects/medium/PostList";
import Spinner from "../../Spinner";
import { getProfileByHandle } from "../../../store/actions/profile";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/profiles");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let content;

    if (profile === null || loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <Header profile={profile} />
          <About profile={profile} />
          <Credentials
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubUsername ? (
            <GithubProjects username={profile.githubUsername} />
          ) : null}
          <MediumPosts />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
