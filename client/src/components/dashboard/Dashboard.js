import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../store/actions/profile";
import ProfileLinks from "./ProfileLinks";

class Dashboard extends Component {
  componentDidMount() {
    // console.log(this.props.auth);
    this.props.getCurrentProfile(this.props.auth.user.id);
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  };

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
            <div className="col-md-12">
              <div>
                <h5>
                  Welcome{" "}
                  <Link to={`/profile/${profile.handle}`}>{user.username}</Link>
                </h5>

                <ProfileLinks />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        content = (
          <div>
            <p>User has not setup a profile yet... {user.username}</p>
            <Link to="/createprofile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container" style={{ marginTop: "10%" }}>
          <div className="row">
            <div className="col-md-12">{content}</div>
          </div>
        </div>
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
