import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newCommentBody, newCommentAuthor } from '../actions';
import { sendComment } from '../reducers/comments';
import { fetchSinglePost } from '../reducers/posts';
import _ from 'lodash';

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.id);
  }
  handleBodyChange(e) {
    this.props.onBodyChange(e.target.value);
  }
  handleAuthorChange(e) {
    this.props.onAuthorChange(e.target.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    const base64Title = new Buffer(this.props.author).toString('base64');
    const timestamp = Date.now();
    const id = base64Title + timestamp;
    const body = this.props.body;
    const author = this.props.author;
    this.props.onSubmit({
      id,
      timestamp,
      body,
      author,
      parentId: this.props.match.params.id,
    });
    this.props.history.push(`/post/${this.props.match.params.id}`);
  }
  handleCancel() {
    this.props.history.push(`/post/${this.props.match.params.id}`);
  }
  render() {
    if (_.isEmpty(this.props.post) || !this.props.post || this.props.post.error) {
      return <div>Sorry, post was not found</div>;
    }
    return (
      <div>
        <header>
          <h1>Readable App</h1>
          <h4>Add New Comment</h4>
        </header>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.props.author}
            onChange={this.handleAuthorChange}
            placeholder="Enter Author..."
          />
          <br />
          <textarea
            value={this.props.body}
            onChange={this.handleBodyChange}
            placeholder="Enter Comment..."
          />
          <br />
          <div>
            <span>
              <input type="submit" value="Submit" />
            </span>
            <span>
              <button onClick={this.handleCancel}>Cancel</button>
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
      fetchSinglePost: id => fetchSinglePost(id),
      onBodyChange: value => newCommentBody(value),
      onAuthorChange: value => newCommentAuthor(value),
      onSubmit: comment => sendComment(comment),
    },
    dispatch,
  );

export default connect(
  state => ({
    post: state.posts.post,
    body: state.comments.newCommentBody,
    author: state.comments.newCommentAuthor,
  }),
  mapDispatchToProps,
)(AddComment);
