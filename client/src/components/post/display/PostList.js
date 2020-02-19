import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostList extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;
