import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import moment from "moment";

import "../../../assets/styles/components/post/PostItem.scss";
import { deletePost, addLike, removeLike } from "../../../store/actions/post";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    var time = moment(post.date).format("DD-MM-YYYY h:mm:ss");

    console.log(post);
    return (
      // <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              style={{ height: "120px", width: "120px" }}
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-4">
              <p className="text-left">{post.name}</p>
            </div>
            <div className="offset-md-4 col-md-4">
              <p className="text-right">{time}</p>
            </div>
          </div>
          {/* <br /> */}

          <p className="lead">{post.content}</p>

          {showActions ? (
            <div className="row">
              <div className="offset-md-9 col-md-3">
                <span className="text-right">
                  <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        green: this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={this.onUnlikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-down", {
                        red: !this.findUserLike(post.likes)
                      })}
                    />
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      // </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
