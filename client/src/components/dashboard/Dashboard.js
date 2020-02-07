import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
// import DashboardActions from "./DashboardActions";
// import Experience from "./Experience";
// import Education from "./Education";
import { getCurrentProfile } from "../../store/actions/profile";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
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
        content = <h4>Profile</h4>;
      } else {
        content = (
          <div>
            <p>User has not setup a profile yet...</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </div>
        );
      }
      content = <div>Profile</div>;
    }
    return (
      <div className="dashboard">
        <div className="container" style={{ marginTop: "20%" }}>
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">{content}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
