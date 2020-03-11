import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import CreateComment from "../forms/CreateComment";
import CommentList from "./CommentList";
import Spinner from "../../Spinner";
import { getPost } from "../../../store/actions/post";
// import CurrentUser from "../../layout/CurrentUser";
import "../../../assets/styles/components/layout/CurrentUser.scss";

class Post extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { auth } = this.props;
    const { post, loading } = this.props.post;

    let content;

    if (post === null || loading || Object.keys(post).length === 0) {
      content = <Spinner />;
    } else {
      content = (
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
          <div
            className="main-content"
            style={{ minHeight: "auto", marginTop: "5%" }}
          >
            {/* <div> */}
            <PostItem post={post} showActions={false} />
            <CreateComment postId={post._id} />
            <CommentList postId={post._id} comments={post.comments} />
            {/* </div> */}
          </div>
        </div>
      );
    }

    return (
      <div className="feed" style={{ minHeight: "auto", marginTop: "" }}>
        {/* <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link> */}
        {content}
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost })(Post);
