import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MentionsInput, Mention } from 'react-mentions';

import { addComment } from "../../../store/actions/post";
import { getProfiles } from "../../../store/actions/profile";


class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      errors: {}
    };
    this.cancel = '';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    
    const newComment = {
      content: this.state.content,
      name: user.username,
      avatar: user.avatar
    };
    this.props.addComment(postId, newComment);
    this.setState({ content: "" });
  };

  onChange = event => {
    this.setState({ content : event.target.value });
  };

   getUsers = (si) => {
    var { content } = this.state;
    var ei = si+1; 
    while(ei<content.length && content[ei] !== " ") ei++;
    var query = content.substring(si+1, ei);
    this.props.getProfiles(query, this.cancel.token);
  }

  oninputkeypressup = () => {
    var si = this.state.content.indexOf("@");
    while(si !== -1) {  
      this.getUsers(si);
      si = this.state.content.indexOf("@", si+1);
    }
	} 

  displayMentions = (id, display) => {
    return `@${display}`
  }

  render() {
    const { errors } = this.state;
    const { profiles } = this.props.profile;
    const allusers = profiles.map(profile => ({
      id: profile.user._id,
      display: profile.handle
    }));

    return (
      <div className="comment-form mb-3">
        <div className="card card-info" style={{ backgroundColor: "#fff" }}>
          <div className="firstinfo">
            <div className="row">
              <div className="col-md-2">
                <img src={this.props.auth.user.avatar} alt="" />
              </div>
              <div className="col-md-10">
                <div className="profileinfo">
                  <h1 style={{ color: "#222" }}>Make a comment...</h1>
                  <div className="card-body" style={{ padding: "0" }}>
                    <form onSubmit={this.onSubmit}>
                      <MentionsInput
                        placeholder="Give your comment.."
                        name="content"
                        value={this.state.content}
                        onChange={this.onChange}
                        onKeyUp={this.oninputkeypressup}
                        className="mentions"
                      >
                        <Mention
                          trigger="@"
                          data={allusers}
                          displayTransform={this.displayMentions}
                          markup="@[__display__]"
                          className="mentions__mention"
                          appendSpaceOnAdd
                        />
                      </MentionsInput>
                      {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                      <button
                        type="submit"
                        className="btn btn-dark"
                        style={{ margin: "0 auto", display: "block" }}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment, getProfiles })(CreateComment);
