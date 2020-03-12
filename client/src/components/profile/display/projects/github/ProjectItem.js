import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostItem extends Component {
  render() {
    const { repo } = this.props;
    console.log(repo);

    return (
      <div className="card card-body">
        <div className="row">
          <div className="col-md-8">
            <h4>
              <a
                style={{ color: "#8167a9" }}
                href={repo.html_url}
                className=""
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
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
            <span className="badge badge-info mr-1">
              Language: {repo.language}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default PostItem;
