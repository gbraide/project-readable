import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import store from '../store';
import { commentVote, fetchAllComments } from '../reducers/comments';

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }
  handleClick() {
    store.dispatch(
      push(`/post/${this.props.comment.parentId}/edit-comment/${this.props.comment.id}`),
    );
  }
  handleUpVote() {
    this.props.upVoteComment(this.props.comment.id, { option: 'upVote' });
    this.props.fetchAllComments(this.props.comment.parentId);
  }
  handleDownVote() {
    this.props.downVoteComment(this.props.comment.id, { option: 'downVote' });
    this.props.fetchAllComments(this.props.comment.parentId);
  }
  render() {
    const comment = this.props.comment;
    const convertTimestamp = new Date(comment.timestamp);
    const date = convertTimestamp.toString();

    return (
      <section>
        <div>
          <span>
            <cite>Author: {comment.author} </cite>|
          </span>
          <span>
            <cite>
              <small> {date}</small>
            </cite>
          </span>
        </div>
        <div>
          <cite>
            <small className="readable-post-score-btns"> Score: {comment.voteScore} </small>
            <small className="readable-post-score-btns">
              <button className="btn btn-success btn-xs" onClick={this.handleUpVote}>
                Up Vote
              </button>
            </small>
            <small className="readable-post-score-btns">
              <button className="btn btn-danger btn-xs" onClick={this.handleDownVote}>
                Down vote
              </button>
            </small>
          </cite>
        </div>
        <p>{comment.body}</p>
        <button className="btn btn-info btn-sm" onClick={this.handleClick}>
          Comment Detail
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      upVoteComment: (id, vote) => commentVote(id, vote),
      downVoteComment: (id, vote) => commentVote(id, vote),
      fetchAllComments: id => fetchAllComments(id),
    },
    dispatch,
  );
export default connect(null, mapDispatchToProps)(CommentItem);
