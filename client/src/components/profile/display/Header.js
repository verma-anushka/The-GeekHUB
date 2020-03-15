import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { follow, unfollow } from "../../../store/actions/profile";

class Header extends Component {
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
    const { profile } = this.props.profile;

    return (
      <div className="card-bg">
        <img
          className="card-bg"
          src={profile.user.bannerImg}
          alt={profile.user.bannerImg}
        />
        <figure className="profile-picture">
          <img
            className="card-bg"
            src={profile.user.avatar}
            alt={profile.user.avatar}
            style={{ height: "120px", width: "120px" }}
          />
        </figure>
        <div className="profile-stats">
          <ul>
            <li>
              <h1 className="display-6">{profile.user.username}</h1>
            </li>
            <li className="pull-right" style={{ verticalAlign: "middle" }}>
              <button
                // style={{ borderRadius: "50%", width: "80px" }}
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
            <li className="pull-right">
              <button
                onClick={this.onUnfollowClick.bind(this, profile.user._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
            </li>
          </ul>
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

export default connect(mapStateToProps, { follow, unfollow })(Header);
