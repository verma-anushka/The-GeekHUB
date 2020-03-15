import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../../validation/isEmpty";
import { follow, unfollow } from "../../../store/actions/profile";

class Social extends Component {
  render() {
    const { profile } = this.props.profile;

    return (
      <div className="row" style={{ marginTop: "25px" }}>
        <div className="col-md-12">
          <div
            className="card card-body text-white"
            style={{ backgroundColor: "#8167a9" }}
          >
            <div className="text-center">
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
                    title="Pinterest"
                    itemProp="significantLink"
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

Social.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(mapStateToProps, { follow, unfollow })(Social);
