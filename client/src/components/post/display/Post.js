import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import CreateComment from "../forms/CreateComment";
import CommentList from "./CommentList";
import Spinner from "../../Spinner";
import { getPost } from "../../../store/actions/post";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let content;

    if (post === null || loading || Object.keys(post).length === 0) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <PostItem post={post} showActions={false} />
          <CreateComment postId={post._id} />
          <CommentList postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post" style={{ marginTop: "10%" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
