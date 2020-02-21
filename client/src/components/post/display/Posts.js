import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreatePost from "../forms/CreatePost";
import PostList from "./PostList";
import Spinner from "../../Spinner";
import { getPosts } from "../../../store/actions/post";

class Posts extends Component {
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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CreatePost />
              {content}
            </div>
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
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
