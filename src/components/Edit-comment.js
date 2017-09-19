import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavMenu from './Nav-menu';
import { newCommentBody, newCommentAuthor } from '../actions';
import {
  fetchSingleComment,
  editComment,
  deleteSingleComment,
  commentVote,
} from '../reducers/comments';
import { fetchSinglePost } from '../reducers/posts';
import _ from 'lodash';

class EditComment extends Component {
  constructor(props) {
    super(props);

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.id);
    this.props.fetchSingleComment(this.props.match.params.commentId);
  }
  handleBodyChange(e) {
    this.props.onBodyChange(e.target.value);
  }
  handleAuthorChange(e) {
    this.props.onAuthorChange(e.target.value);
  }
  handleUpVote() {
    this.props.upVoteComment(this.props.comment.id, { option: 'upVote' });
  }
  handleDownVote() {
    this.props.downVoteComment(this.props.comment.id, { option: 'downVote' });
  }
  handleSubmit(e) {
    e.preventDefault();
    const timestamp = Date.now();
    const body = this.props.body;

    this.props.onSubmit(this.props.comment.id, {
      timestamp,
      body,
    });

    this.props.onBodyChange('');
    this.props.history.push(`/post/${this.props.match.params.id}`);
  }
  handleCancel() {
    this.props.history.push(`/post/${this.props.match.params.id}`);
    this.props.onBodyChange('');
  }
  handleDelete() {
    this.props.onDeletePost(this.props.comment.id);
    this.props.onBodyChange('');
    this.props.history.push(`/post/${this.props.match.params.id}`);
  }
  render() {
    const bodyPlaceholder = this.props.body ? this.props.body : this.props.comment.body;
    const authorPlaceholder = this.props.author ? this.props.author : this.props.comment.author;
    if (_.isEmpty(this.props.post) || !this.props.post || this.props.post.error) {
      return (
        <div>
          <NavMenu />
          <div>Sorry, post was not found</div>
        </div>
      );
    }
    return (
      <div>
        <header>
          <NavMenu />
          <h4>View/Edit Comment</h4>
          <div>
            <cite>
              <small> Score: {this.props.comment.voteScore} </small>
              <small>
                <button onClick={this.handleUpVote}>Up Vote</button>
              </small>
              <small>
                <button onClick={this.handleDownVote}>Down vote</button>
              </small>
            </cite>
          </div>
        </header>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.props.author}
            onChange={this.handleAuthorChange}
            placeholder={authorPlaceholder}
            disabled
          />
          <br />
          <textarea
            value={bodyPlaceholder}
            onChange={this.handleBodyChange}
            placeholder={bodyPlaceholder}
          />
          <br />
          <div>
            <span>
              <input type="submit" value="Submit" />
            </span>
            <span>
              <button onClick={this.handleCancel}>Cancel</button>
            </span>
            <span>
              <button onClick={this.handleDelete}>Delete</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.post,
  body: state.comments.newCommentBody,
  author: state.comments.newCommentAuthor,
  comment: state.comments.comment,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSinglePost: id => fetchSinglePost(id),
      fetchSingleComment: id => fetchSingleComment(id),
      onBodyChange: value => newCommentBody(value),
      onAuthorChange: value => newCommentAuthor(value),
      onSubmit: (id, comment) => editComment(id, comment),
      onDeletePost: id => deleteSingleComment(id),
      upVoteComment: (id, vote) => commentVote(id, vote),
      downVoteComment: (id, vote) => commentVote(id, vote),
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
