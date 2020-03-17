import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../store/actions/profile";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found!</h4>;
      }
    }

    return (
      <div className="profiles" style={{ marginTop: "10%" }}>
        <h1
          className="display-4 text-center"
          style={{ textTransform: "uppercase" }}
        >
          Developer Profiles
        </h1>
        {profileItems}
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
