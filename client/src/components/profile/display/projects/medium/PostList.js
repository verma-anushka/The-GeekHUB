import React, { Component } from "react";
import PostItem from "./PostItem";

import axios from "axios";

class MediumPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  getMediumFeed = async () => {
    try {
      const username = this.props.username.split("https://medium.com/@")[1];
      const mediumRssFeed = "https://medium.com/feed/@" + username;
      const rssToJsonApi =
        "https://cors-anywhere.herokuapp.com/https://api.rss2json.com/v1/api.json";
      const data = { params: { rss_url: mediumRssFeed } };
      const response = await axios.get(rssToJsonApi, data);
      this.setState({ posts: response.data.items });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.getMediumFeed();
  }

  render() {
    const { posts } = this.state;

    const postItems = posts.map(post => {
      const id = post.guid.trim().split("https://medium.com/p/")[1];
      return <PostItem key={id} post={post} />;
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
          Latest Medium Posts
        </h3>
        {postItems}
      </div>
    );
  }
}

export default MediumPosts;
