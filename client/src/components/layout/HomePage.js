import React, { Component } from "react";
import "./HomePage.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HomePage extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div className="homepage">
        <h1>Go Geeks</h1>
      </div>
    );
  }
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { HomePage })(HomePage);
