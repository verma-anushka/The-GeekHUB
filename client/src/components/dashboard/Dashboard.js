import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../store/actions/profile";
import ProfileLinks from "./ProfileLinks";
import GroupsFolder from "../../assets/images/groups-folders.png";

class Dashboard extends Component {
  componentDidMount() {
    // console.log(this.props.auth);
    this.props.getCurrentProfile(this.props.auth.user.id);
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let content;

    if (profile === null || loading) {
      content = <Spinner />;
    } else {
      // Check empty object
      if (Object.keys(profile).length > 0) {
        content = (
          <div className="row">
            <div className="col-md-9">
              <h5>
                Welcome back,{" "}
                <Link
                  style={{ color: "#8167a9" }}
                  to={`/profile/${profile.handle}`}
                >
                  {user.username}
                </Link>
              </h5>
            </div>
            <div className="col-md-3">
              <ProfileLinks />
            </div>
            <div className="col-md-12">
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </div>
          </div>
        );
      } else {
        content = (
          <div>
            <div className="line-wrap">
              <h3 style={{ textAlign: "center" }}>
                Welcome to <span style={{ color: "#8167a9" }}>The GeekHUB</span>{" "}
                {user.username}
              </h3>
              <div className="row">
                <div
                  style={{ margin: "auto 0", display: "block" }}
                  className="col-md-6"
                >
                  <p style={{ marginBottom: "15px" }}>
                    You don't have a profile setup yet!
                    <br />
                    Create your profile now!
                  </p>

                  <Link
                    to="/createprofile"
                    className="btn btn-primary my-1"
                    style={{
                      display: "block",
                      width: "150px",
                      background: "#8167a9",
                      margin: "0 auto",
                      outline: "none",
                      focus: "none",
                      border: "none"
                    }}
                  >
                    Create Profile
                  </Link>
                </div>
                <div className="col-md-6">
                  <div
                    style={{ left: "0", transform: "scale(1)" }}
                    className="account-ring-wrap orbit-animation ring-animation"
                  >
                    <div className="account-ring-inner">
                      <div className="account-ring big-ring bounceInLarge">
                        <span className="animation-account-icon animation-image-readonly">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-read-only.svg"
                            className="animation-image-readonly-img"
                          />
                        </span>

                        <span className="animation-account-icon animation-image-readonly2">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-read-only.svg"
                            className="animation-image-readonly2-img"
                          />
                        </span>

                        <span className="animation-account-icon animation-image-noaccess">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-no-access.svg"
                            className="animation-image-noaccess-img"
                          />
                        </span>

                        <span className="animation-account-icon animation-image-noaccess2">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-no-access.svg"
                            className="animation-image-noaccess2-img"
                          />
                        </span>
                      </div>

                      <div className="account-ring middle-ring bounceInMedium">
                        <span className="animation-account-icon animation-image-manager">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-manager.svg"
                            className="animation-image-manager-img"
                          />
                        </span>

                        <span className="animation-account-icon animation-image-manager2">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-manager.svg"
                            className="animation-image-manager2-img"
                          />
                        </span>

                        <span className="animation-account-icon animation-image-manager3">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-manager.svg"
                            className="animation-image-manager3-img"
                          />
                        </span>
                      </div>

                      <div className="account-ring small-ring bounceInSmall  ">
                        <span className="animation-account-icon animation-image-admin">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-admin.svg"
                            className="animation-image-admin-img"
                          />
                        </span>

                        <span className="animation-account-icon animation-image-admin2">
                          <img
                            alt=""
                            src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-admin.svg"
                            className="animation-image-admin2-img"
                          />
                        </span>
                      </div>
                    </div>
                    <img
                      alt=""
                      src={GroupsFolder}
                      // src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/groups-folders.png"
                      className="folder-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="dashboard" style={{ marginTop: "10%" }}>
        {content}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  // console.log(state.profile);
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
