import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newCommentBody, newCommentAuthor } from '../actions';
import { fetchSingleComment, editComment, deleteSingleComment } from '../reducers/comments';

class EditComment extends Component {
  constructor(props) {
    super(props);

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.fetchSingleComment(this.props.match.params.commentId);
  }
  handleBodyChange(e) {
    this.props.onBodyChange(e.target.value);
  }
  handleAuthorChange(e) {
    this.props.onAuthorChange(e.target.value);
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
    // this.props.history.push(`/post/${this.props.match.params.id}`);
    // this.props.onBodyChange('');
  }
  render() {
    const bodyPlaceholder = this.props.body ? this.props.body : this.props.comment.body;
    const authorPlaceholder = this.props.author ? this.props.author : this.props.comment.author;

    return (
      <div>
        <header>
          <h1>Readable App</h1>
          <h4>View/Edit Comment</h4>
        </header>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSingleComment: id => fetchSingleComment(id),
      onBodyChange: value => newCommentBody(value),
      onAuthorChange: value => newCommentAuthor(value),
      onSubmit: (id, comment) => editComment(id, comment),
      onDeletePost: id => deleteSingleComment(id),
    },
    dispatch,
  );

export default connect(
  state => ({
    body: state.comments.newCommentBody,
    author: state.comments.newCommentAuthor,
    comment: state.comments.comment,
  }),
  mapDispatchToProps,
)(EditComment);
