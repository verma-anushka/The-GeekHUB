import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteAccount } from "../../store/actions/profile";

class ProfileLinks extends Component {
  onDeleteClick = () => {
    this.props.deleteAccount();
  };
  render() {
    return (
      <div className="btn-group mb-4 ml-10" role="group">
        <Link to="/editprofile" className="btn btn-light mr-2">
          <i style={{ color: "#8167a9" }} className="fas fa-user-circle" />
          {/* Edit Profile */}
        </Link>
        <Link to="/addexperience" className="btn btn-light mr-2">
          <i style={{ color: "#8167a9" }} className="fab fa-black-tie" />
          {/* Add Experience */}
        </Link>
        <Link to="/addeducation" className="btn btn-light mr-2">
          <i style={{ color: "#8167a9" }} className="fas fa-graduation-cap" />
          {/* Add Education */}
        </Link>
        <button onClick={this.onDeleteClick} className="btn btn-danger">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    );
  }
}

ProfileLinks.propTypes = {
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

export default connect(mapStateToProps, { deleteAccount })(ProfileLinks);
