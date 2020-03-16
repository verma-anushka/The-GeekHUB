import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../../formInputs/TextAreaFieldGroup";
import { addComment } from "../../../store/actions/post";

class CreateComment extends Component {
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
    const { postId } = this.props;

    const newComment = {
      content: this.state.content,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ content: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;
    console.log(errors);

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
                      <TextAreaFieldGroup
                        placeholder="Reply to post"
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

          {/* <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
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
          </div> */}
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
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CreateComment);
