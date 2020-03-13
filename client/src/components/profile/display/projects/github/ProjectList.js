import React, { Component } from "react";
import PropTypes from "prop-types";
import ProjectItem from "./ProjectItem";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "7e52d9301abb75f6cd96",
      clientSecret: "e0f44c5c1c495c4609069e6a3a50136221d38995",
      count: 5,
      sort: "created: des",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => {
      return <ProjectItem key={repo.id} repo={repo} />;
    });

    return (
      <div ref="myRef">
        <hr />
        <h3
          className="mb-4"
          style={{
            textAlign: "center",
            color: "#8167a9",
            textTransform: "uppercase"
          }}
        >
          Latest Github Repos
        </h3>
        {repoItems}
      </div>
    );
  }
}

ProjectList.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProjectList;
