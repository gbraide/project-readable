import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavMenu from './Nav-menu';
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
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <header className="page-header">
                <NavMenu />
              </header>
              <div>Sorry, post was not found</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <header className="page-header">
              <NavMenu />
              <h4>Add New Comment</h4>
            </header>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.props.author}
                  onChange={this.handleAuthorChange}
                  placeholder="Enter Author..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="body">Body</label>
                <textarea
                  type="text"
                  className="form-control"
                  value={this.props.body}
                  onChange={this.handleBodyChange}
                  placeholder="Enter Comment..."
                />
              </div>
              <div>
                <span className="readable-form-action-btns">
                  <input type="submit" className="btn btn-success" value="Submit" />
                </span>
                <span className="readable-form-action-btns">
                  <button className="btn btn-danger" onClick={this.handleCancel}>
                    Cancel
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
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
