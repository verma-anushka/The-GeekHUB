import React, { Component } from "react";
import isEmpty from "../../../validation/isEmpty";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    const { profile } = this.props.profile;
    // console.log(profile);

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                  style={{ height: "180px", width: "180px" }}
                />
              </div>
            </div>
            <div className="text-center">
              {/* <h1 className="display-4 text-center">{profile.user}</h1> */}
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.organization) ? null : (
                  <span>at {profile.organization}</span>
                )}
              </p>

              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

              <p>
                {isEmpty(profile.websiteLink) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.linkedin
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.medium
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-medium fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.behance
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-behance fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.github
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.youtube
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.twitter
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.facebook
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.instagram
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(mapStateToProps)(Header);
