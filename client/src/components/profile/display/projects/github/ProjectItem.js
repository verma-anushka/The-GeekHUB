import React, { Component } from "react";
import Moment from "react-moment";

class PostItem extends Component {
  render() {
    const { repo } = this.props;
    // console.log(repo);

    return (
      <div className="card card-body">
        <div className="row">
          <div className="offset-md-1 col-md-7">
            <h4>{repo.name}</h4>
            <p
              className="text-muted"
              style={{ textAlign: "left", paddingTop: "0" }}
            >
              <Moment format="YYYY/MM/DD">{repo.created_at}</Moment>
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#8167a9" }}
            >
              View Post
            </a>
            <p style={{ textAlign: "left", paddingTop: "0" }}>
              {repo.description}
            </p>
          </div>
          <div className="col-md-4">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {repo.forks_count}
            </span>
            <span
              className="badge badge-info mr-1"
              style={{ backgroundColor: "#8167a9" }}
            >
              Language: {repo.language}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default PostItem;
