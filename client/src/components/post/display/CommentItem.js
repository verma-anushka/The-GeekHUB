import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import getMentions from './utils/getMentions';
import markupToRegex from './utils/markupToRegex';

import { deleteComment } from "../../../store/actions/post";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
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
    const { comment, postId, auth } = this.props;

    var text = comment.content;
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

    return (
      <div className="comment-item mb-3">
        <div className="card card-body" style={{ backgroundColor: "#fff" }}>
          <div className="firstinfo">
            <div className="row">
              <div className="col-md-2">
                <img src={comment.avatar} alt={comment.name} />
                <br />
                <p className="text-center">{comment.name}</p>
              </div>
              <div className="col-md-10">
                <div className="profileinfo">
                  <h1 style={{ color: "#222" }}>{comment.name}</h1>
                  {/* <p className="bio">{comment.content}</p> */}
                  <p className="bio" dangerouslySetInnerHTML={{ __html: text.replace(/\n\r?/g, '<br />') }}/>
                  {comment.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(
                        this,
                        postId,
                        comment._id
                      )}
                      type="button"
                      className="btn btn-danger pull-right"
                      style={{ float:"right" }}
                    >
                      <i className="fas fa-times" />
                    </button>
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

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
