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

  render() {
    const { profile, loading } = this.props.profile;
    let content;
    console.log(profile);

    if (profile === null || loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className="card">
          <img
            src={profile.user.bannerImg}
            alt=""
            style={{ height: "180px", width: "180px" }}
          />
          {/* <header className="card-header">
            <div className="hello">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/435311/React--daily-ui-006.jpg"
                alt=""
              />
              <div className="heading-box">
                <h1>John Doe</h1>
                <h3>
                  Photographer,{" "}
                  <span>
                    <i className="material-icons">location_city</i> Warsaw, PL
                  </span>
                </h3>
              </div>
            </div>
            <div className="button-box">
              <a className="follow-btn" href="#">
                <i className="material-icons"></i>
              </a>
            </div>
          </header> */}

          <div className="card-bg">
            <Header profile={profile} />
          </div>
          <Link to="/profiles" className="btn btn-light mb-3 float-left">
            Back To Profiles
          </Link>
          <About profile={profile} />
          <Credentials
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubUsername ? (
            <GithubProjects username={profile.githubUsername} />
          ) : null}
          <MediumPosts />
          <main className="card-main">
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
          </main>
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

    return (
      // <div className="profile">
      // <div className="container">
      // <div className="row">
      // <div className="col-md-12">{content}</div>
      // </div>
      // </div>
      // </div>
      <div>{content}</div>
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
