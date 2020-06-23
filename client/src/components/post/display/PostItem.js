import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import moment from "moment";

import getMentions from './utils/getMentions';
import markupToRegex from './utils/markupToRegex';

import "../../../assets/styles/components/post/PostItem.scss";
import { deletePost, addLike, removeLike } from "../../../store/actions/post";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getMentionsInText(text) {

    const userMarkup = '@[__display__]'
    const defaultDisplayTransform = (id, display) => display
    const config = [
      {
        markup: userMarkup,
        regex: markupToRegex(userMarkup),
        displayTransform: defaultDisplayTransform,
      }
    ]
    return getMentions(text, config);
  }
  
  render() {
    const { post, auth, showActions } = this.props;

    var text = post.content;
    var mentions = this.getMentionsInText(text);
    var si=text.indexOf('@[');
    var curr=0;

    while(si!==-1) {
        var ei=text.indexOf(']');
        var newstr = "<a style=\"color:#8167a9\" href='/profile/"+mentions[curr].display+ "' target='_blank' >@"+mentions[curr].display+ "</a>"
        text=text.replace(text.substring(si,ei+1), newstr);
        si=text.indexOf('@[');
        curr++;
    }
    
    var time = moment(post.date).format("DD-MM-YYYY h:mm:ss");
    return (
      <div className="content post-item">
        <div
          className="card"
          style={{ marginBottom: "20px", backgroundColor: "#fff" }}
        >
          <div className="firstinfo">
            <div className="row">
              <div className="col-md-2">
                <img src={post.avatar} alt="" />
              </div>
              <div className="col-md-10">
                <div className="profileinfo">
                  <h1 style={{ color: "#222" }}>{post.name}</h1>
                  <h3>{time}</h3>
                  {/* <p className="bio">{post.content}</p> */}
                  <p className="bio" dangerouslySetInnerHTML={{ __html: text.replace(/\n\r?/g, '<br />') }}/>
                  {showActions ? (
                    <div className="row">
                      <div className="col-md-12">
                        <span className="text-right">
                          <button
                            onClick={this.onLikeClick.bind(this, post._id)}
                            type="button"
                            className="btn btn-light mr-1"
                          >
                            <i
                              className={classnames("fas fa-thumbs-up", {
                                green: this.findUserLike(post.likes)
                              })}
                            />
                            <span className="badge badge-light">
                              {post.likes.length}
                            </span>
                          </button>
                          <button
                            onClick={this.onUnlikeClick.bind(this, post._id)}
                            type="button"
                            className="btn btn-light mr-1"
                          >
                            <i
                              className={classnames("fas fa-thumbs-down", {
                                // red: !this.findUserLike(post.likes)
                              })}
                            />
                          </button>
                          <Link
                            to={`/post/${post._id}`}
                            className="btn btn-info mr-1"
                          >
                            Comments
                          </Link>
                          {post.user === auth.user.id ? (
                            <button
                              onClick={this.onDeleteClick.bind(this, post._id)}
                              type="button"
                              className="btn btn-danger mr-1"
                            >
                              <i className="fas fa-times" />
                            </button>
                          ) : null}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
