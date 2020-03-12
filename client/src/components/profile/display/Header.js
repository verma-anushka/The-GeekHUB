import React, { Component } from "react";
import classnames from "classnames";
// import isEmpty from "../../../validation/isEmpty";
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
    // console.log(profile);

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
                  // style={{ float: "left" }}
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
                // style={{ borderRadius: "50%" }}
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
      // <header className="card-header">
      //   <div className="hello">
      //     {/* <img
      //       src={profile.user.avatar}
      //       alt=""
      //       style={{ height: "180px", width: "180px" }}
      //     /> */}
      //     <div className="heading-box">
      //       <h1>{profile.user.username}</h1>
      //       <h3>
      //         {profile.status}
      //         <span>
      //           <i className="material-icons">
      //             {" "}
      //             {isEmpty(profile.organization) ? null : (
      //               <span>at {profile.organization}</span>
      //             )}
      //           </i>{" "}
      //           Warsaw, PL
      //         </span>
      //       </h3>
      //     </div>
      //   </div>
      //   <div className="button-box">
      //     <a className="follow-btn" href="#">
      //       <i className="material-icons"></i>
      //     </a>
      //   </div>
      // </header>
      // <div className="row">
      //   <div className="col-md-12">
      //     <div className="card card-body bg-info text-white mb-3">
      //       <div className="row">
      //         <div className="col-4 col-md-3 m-auto">
      //           <img
      //             className="rounded-circle"
      //             src={profile.user.avatar}
      //             alt=""
      //             style={{ height: "180px", width: "180px" }}
      //           />
      //         </div>
      //       </div>
      //       <div className="text-center">
      //         {/* <h1 className="display-4 text-center">{profile.user}</h1> */}
      //         <p className="lead text-center">
      //           {profile.status}{" "}
      //           {isEmpty(profile.organization) ? null : (
      //             <span>at {profile.organization}</span>
      //           )}
      //         </p>

      //         {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

      //         <p>
      //           {isEmpty(profile.websiteLink) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.websiteLink}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fas fa-globe fa-2x" />
      //             </a>
      //           )}

      //           {isEmpty(
      //             profile.socialLinks && profile.socialLinks.linkedin
      //           ) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.socialLinks.linkedin}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fab fa-linkedin fa-2x" />
      //             </a>
      //           )}

      //           {isEmpty(
      //             profile.socialLinks && profile.socialLinks.medium
      //           ) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.socialLinks.medium}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fab fa-medium fa-2x" />
      //             </a>
      //           )}

      //           {isEmpty(
      //             profile.socialLinks && profile.socialLinks.behance
      //           ) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.socialLinks.behance}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fab fa-behance fa-2x" />
      //             </a>
      //           )}

      //           {isEmpty(
      //             profile.socialLinks && profile.socialLinks.github
      //           ) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.socialLinks.github}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fab fa-github fa-2x" />
      //             </a>
      //           )}

      //           {isEmpty(
      //             profile.socialLinks && profile.socialLinks.youtube
      //           ) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.socialLinks.youtube}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fab fa-youtube fa-2x" />
      //             </a>
      //           )}

      //           {isEmpty(
      //             profile.socialLinks && profile.socialLinks.twitter
      //           ) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.socialLinks.twitter}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fab fa-twitter fa-2x" />
      //             </a>
      //           )}

      //           {isEmpty(
      //             profile.socialLinks && profile.socialLinks.facebook
      //           ) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.socialLinks.facebook}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fab fa-facebook fa-2x" />
      //             </a>
      //           )}

      //           {isEmpty(
      //             profile.socialLinks && profile.socialLinks.instagram
      //           ) ? null : (
      //             <a
      //               className="text-white p-2"
      //               href={profile.socialLinks.instagram}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               <i className="fab fa-instagram fa-2x" />
      //             </a>
      //           )}
      //         </p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
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
