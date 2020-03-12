import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class ProfileItem extends Component {
  render() {
    // console.log(this.props);
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              style={{ height: "120px", width: "120px" }}
              src={profile.user.avatar}
              alt=""
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.username}</h3>
            <p style={{ textAlign: "left" }}>
              {profile.status}{" "}
              {isEmpty(profile.organization) ? null : (
                <span>
                  at{" "}
                  <span style={{ color: "#8167a9" }}>
                    {profile.organization}
                  </span>
                </span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h5>Skills</h5>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  style={{ background: "transparent" }}
                >
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <Link
            to={`/profile/${profile.handle}`}
            style={{
              textAlign: "center",
              display: "block",
              margin: "0 auto"
            }}
            className="btn btn-info"
          >
            View
          </Link>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
