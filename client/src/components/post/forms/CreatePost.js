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
    // console.log(this.props.auth);
    const { errors } = this.state;

    return (
      <div className="content" style={{ marginTop: "50px" }}>
        <div className="card" style={{ backgroundColor: "#fff" }}>
          <div className="firstinfo">
            <div className="row">
              <div className="col-md-2">
                <img src={this.props.auth.user.avatar} alt="" />
              </div>
              <div className="col-md-10">
                <div className="profileinfo">
                  <h1 style={{ color: "#222" }}>What's on your mind?!</h1>
                  <div className="card-body" style={{ padding: "0" }}>
                    <form onSubmit={this.onSubmit}>
                      <TextAreaFieldGroup
                        placeholder="Create a post"
                        name="content"
                        value={this.state.content}
                        onChange={this.onChange}
                        error={errors.content}
                      />
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
