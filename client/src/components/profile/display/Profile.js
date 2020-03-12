import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Header from "./Header";
// import classnames from "classnames";
import About from "./About";
import Credentials from "./Credentials";
import GithubProjects from "./projects/github/ProjectList";
import MediumPosts from "./projects/medium/PostList";
import Spinner from "../../Spinner";
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
        <div className="card">
          {/* <div className="card-bg">
            <img className="card-bg" src={profile.user.bannerImg} />
            <figure
              class="profile-picture"
              // style="background-image: url('http://unsplash.it/150/150')"
            >
              <img
                className="card-bg"
                src={profile.user.avatar}
                style={{ height: "80px", width: "80px" }}
              />
            </figure>
            <div class="profile-stats">
              <ul>
                <li>
                  <h1 className="display-6">{profile.user.username}</h1>
                </li>
                <li>
                  <button
                    onClick={this.onFollowClick.bind(this, profile.user._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserFollow(profile.followers)
                      })}
                    />
                    <span className="badge badge-light">
                      {profile.followers.length}
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={this.onUnfollowClick.bind(this, profile.user._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                </li>
              </ul>
              <a href="javascript:void(0);" class="follow">
                Follow Nick
              </a>
            </div>
          </div> */}
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
          {profile.socialLinks.medium ? (
            <MediumPosts username={profile.socialLinks.medium} />
          ) : null}
          {/* <MediumPosts /> */}
          {/* <main className="card-main">
            <div className="activity">
              <i className="material-icons">group</i>
              <span className="activity-name">Followers</span>
              <span className="index"></span>
            </div>
            <div className="activity">
              <i className="material-icons">access_time</i>
              <span className="activity-name">Activity</span>
              <span className="index">225</span>
            </div>
            <div className="activity">
              <i className="material-icons">mode_comment</i>
              <span className="activity-name">Posts</span>
              <span className="index">146</span>
            </div>
          </main> */}
        </div>
        // <div>
        //   <div className="row">
        //     <div className="col-md-6">
        //       <Link to="/profiles" className="btn btn-light mb-3 float-left">
        //         Back To Profiles
        //       </Link>
        //     </div>
        //     <div className="col-md-6" />
        //   </div>
        //   <Header profile={profile} />
        //   <About profile={profile} />
        //   <Credentials
        //     education={profile.education}
        //     experience={profile.experience}
        //   />
        //   {profile.githubUsername ? (
        //     <GithubProjects username={profile.githubUsername} />
        //   ) : null}
        //   <MediumPosts />
        // </div>
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
