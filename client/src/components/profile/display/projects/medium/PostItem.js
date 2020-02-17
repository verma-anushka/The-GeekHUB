import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

class PostItem extends Component {
  render() {
    const { post } = this.props;

    const categories = post.categories.map(cat => {
      return (
        <span key={cat} className="badge badge-info mr-1">
          {cat}
        </span>
      );
    });
    // console.log(post);

    return (
      <div className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <div>{post.title}</div>
            <img src={post.thumbnail} alt={post.title}></img>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              View Post
            </a>
          </div>
          <div className="col-md-6">{categories}</div>
        </div>
      </div>
    );
  }
}

export default PostItem;
