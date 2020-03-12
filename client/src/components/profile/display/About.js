import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../../validation/isEmpty";
// import classnames from "classnames";
import { connect } from "react-redux";
import { follow, unfollow } from "../../../store/actions/profile";

class About extends Component {
  // onFollowClick(id) {
  //   this.props.follow(id);
  // }

  // onUnfollowClick(id) {
  //   this.props.unfollow(id);
  // }

  // findUserFollow(followers) {
  //   const { auth } = this.props;
  //   if (
  //     followers.filter(follower => follower.user === auth.user.id).length > 0
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { profile } = this.props;
    // console.log(this.props);

    // Skill List
    const skills = profile.profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="card card-body mb-3">
        {isEmpty(profile.bio) ? null : (
          <div>
            <p className="lead">
              <span>{profile.bio}</span>
            </p>
            <hr />
          </div>
        )}
        {/* <h3 className="text-center text-info">Skill Set</h3> */}
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {skills}
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
