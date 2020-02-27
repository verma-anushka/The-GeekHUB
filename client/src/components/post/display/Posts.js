import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreatePost from "../forms/CreatePost";
import PostList from "./PostList";
import Spinner from "../../Spinner";
import { getPosts } from "../../../store/actions/post";
import CurrentUser from "../../layout/CurrentUser";
import classnames from "classnames";

import "../../../assets/styles/components/layout/CurrentUser.scss";

class Posts extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let content;

    if (posts === null || loading) {
      content = <Spinner />;
    } else {
      content = <PostList posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="main-container">
          <div
            className={classnames("left-sidebar", {
              minimize: !this.state.show
            })}
          >
            <div className="inner">
              <div className="user-profile">
                <div className="user-background"></div>
                <div className="user-image">
                  <img src="https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff" />
                </div>
                <div className="user-info">
                  <p className="user-name">Name</p>
                  <p className="user-title">Status</p>
                  <p className="user-location">
                    <i className="icon ion-md-locate"></i> Location
                  </p>
                </div>
              </div>
              <div className="main-menu"></div>
              <div className="social-links">
                <a href="#">
                  <i className="icon ion-logo-facebook"></i>
                </a>
                <a href="#">
                  <i className="icon ion-logo-twitter"></i>
                </a>
                <a href="#">
                  <i className="icon ion-logo-instagram"></i>
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                // Toggle feature
                this.setState(prevState => ({
                  show: !prevState.show
                }));
              }}
              className="toggle-button"
            >
              <i className="icon ion-md-arrow-dropleft"></i>
            </button>
          </div>
          <div className="main-content">
            {/* <div className="row"> */}
            {/* <div className="col-md-12"> */}
            {/* <CreatePost /> */}
            {content}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
        {/* <CurrentUser /> */}
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
