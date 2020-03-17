import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import PostList from "./PostList";
import Spinner from "../../Spinner";
import CreatePost from "../forms/CreatePost";
import { getPosts } from "../../../store/actions/post";
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
    const { auth } = this.props;
    let content;

    if (posts === null || loading) {
      content = <Spinner />;
    } else {
      content = <PostList posts={posts} />;
    }

    return (
      <div className="feed" style={{ minHeight: "auto" }}>
        <div className="main-container">
          <div
            className={classnames("left-sidebar", {
              minimize: !this.state.show
            })}
            style={{ marginTop: "70px" }}
          >
            <div className="inner">
              <div className="user-profile">
                <div className="user-background"></div>
                <div className="user-image">
                  <img src={auth.user.avatar} alt="" />
                </div>
                <div className="user-info">
                  <p className="user-name">{auth.user.username}</p>
                </div>
              </div>
              <div className="main-menu"></div>
              {/* <div className="social-links">
                <a href="">
                  <i className="icon ion-logo-facebook"></i>
                </a>
                <a href="">
                  <i className="icon ion-logo-twitter"></i>
                </a>
                <a href="">
                  <i className="icon ion-logo-instagram"></i>
                </a>
              </div> */}
            </div>
            <button
              type="button"
              onClick={() => {
                this.setState(prevState => ({
                  show: !prevState.show
                }));
              }}
              className="toggle-button"
            >
              <i className="icon ion-md-arrow-dropleft"></i>
            </button>
          </div>
          <div className="main-content" style={{ minHeight: "auto" }}>
            <CreatePost />
            {content}
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts })(Posts);
