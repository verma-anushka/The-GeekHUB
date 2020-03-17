import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../../validation/isEmpty";
import { follow, unfollow } from "../../../store/actions/profile";

class About extends Component {
  render() {
    const { profile } = this.props;

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
        {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
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
