import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./Header";
import About from "./About";
import Social from "./Social";
import Spinner from "../../Spinner";
import Credentials from "./Credentials";
import GithubProjects from "./projects/github/ProjectList";
import MediumPosts from "./projects/medium/PostList";
import { getProfileByHandle } from "../../../store/actions/profile";
import "../../../assets/styles/components/profile/Profile.scss";

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
  onFollowClick(id) {
    this.props.follow(id);
  }

  onUnfollowClick(id) {
    this.props.unfollow(id);
  }

  findUserFollow(followers) {
    const { auth } = this.props;
    if (
      followers.filter(follower => follower.user === auth.user.id).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    const { profile, loading } = this.props.profile;
    let content;
    if (profile === null || loading) {
      content = <Spinner />;
    } else {
      content = (
        <Fragment >
          <div className="card">
            <Header profile={profile} />
            {/* <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link> */}
            <About profile={profile} />
            <Credentials
              education={profile.education}
              experience={profile.experience}
            />
            {profile.githubUsername ? (
              <GithubProjects username={profile.githubUsername} />
            ) : null}
            {profile.socialLinks && profile.socialLinks.medium ? (
              <MediumPosts username={profile.socialLinks.medium} />
            ) : null}
            <Social profile={profile} />
          </div>
        </Fragment>

      );
    }

    return <div>{content}</div>;
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    user: state.user
  };
};

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
