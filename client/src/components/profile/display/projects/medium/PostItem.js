import React, { Component } from "react";

class PostItem extends Component {
  render() {
    const { post } = this.props;
    // console.log(post);

    const categories = post.categories.map(cat => {
      return (
        <span
          key={cat}
          className="badge badge-info mr-1"
          style={{ backgroundColor: "#8167a9" }}
        >
          {cat}
        </span>
      );
    });

    return (
      <div className="card card-body mb-2">
        <div className="row">
          <div className="offset-md-1 col-md-7">
            <div className="row">
              <div className="col-md-2">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%"
                  }}
                ></img>
              </div>
              <div className="col-md-10">
                <h4>{post.title}</h4>
                <div className="text-muted">{post.pubDate}</div>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#8167a9" }}
                >
                  View Post
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">{categories}</div>
        </div>
      </div>
    );
  }
}

export default PostItem;
