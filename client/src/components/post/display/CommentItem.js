import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../../store/actions/post";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="comment-item mb-3">
        <div className="card card-body" style={{ backgroundColor: "#fff" }}>
          <div className="firstinfo">
            <div className="row">
              <div className="col-md-2">
                <img src={comment.avatar} alt={comment.name} />
                <br />
                <p className="text-center">{comment.name}</p>
              </div>
              <div className="col-md-10">
                <div className="profileinfo">
                  <h1 style={{ color: "#222" }}>{comment.name}</h1>
                  <p className="bio">{comment.content}</p>
                  {comment.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(
                        this,
                        postId,
                        comment._id
                      )}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
