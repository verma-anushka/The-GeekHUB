import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../../validation/isEmpty";
import classnames from "classnames";
import { connect } from "react-redux";
import { follow, unfollow } from "../../../store/actions/profile";

class About extends Component {
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
    const { profile } = this.props;
    // console.log(profile);

    // Skill List
    const skills = profile.profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>No bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>

            <button
              onClick={this.onFollowClick.bind(this, profile.profile.user._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={classnames("fas fa-thumbs-up", {
                  "text-info": this.findUserFollow(profile.profile.followers)
                })}
              />
              <span className="badge badge-light">
                {profile.profile.followers.length}
              </span>
            </button>
            <button
              onClick={this.onUnfollowClick.bind(
                this,
                profile.profile.user._id
              )}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { follow, unfollow })(About);
