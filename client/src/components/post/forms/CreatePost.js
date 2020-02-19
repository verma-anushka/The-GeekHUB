import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../../formInputs/TextAreaFieldGroup";
import { addPost } from "../../../store/actions/post";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      content: this.state.content,
      name: user.username,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ content: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3" style={{ marginTop: "10%" }}>
        <div className="card card-info">
          <div className="card-header bg-info content-white">
            Say Something...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="content"
                  value={this.state.content}
                  onChange={this.onChange}
                  error={errors.content}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreatePost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(CreatePost);
