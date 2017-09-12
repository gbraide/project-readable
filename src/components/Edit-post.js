import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newPostTitle, newPostBody } from '../actions';
import { fetchSinglePost, editPost } from '../reducers/posts';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.id);
  }
  handleTitleChange(e) {
    this.props.onTitleChange(e.target.value);
  }
  handleBodyChange(e) {
    this.props.onBodyChange(e.target.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    const title = this.props.title ? this.props.title : this.props.post.title;
    const body = this.props.body ? this.props.body : this.props.post.body;
    this.props.onSubmit(this.props.match.params.id, {
      title,
      body,
    });
    this.props.onBodyChange('');
    this.props.onTitleChange('');
    this.props.history.push('/');
  }
  handleCancel() {
    this.props.onBodyChange('');
    this.props.onTitleChange('');
    this.props.history.push(`/post/${this.props.match.params.id}`);
  }
  render() {
    const titlePlaceholder = this.props.title ? this.props.title : this.props.post.title;
    const bodyPlaceholder = this.props.body ? this.props.body : this.props.post.body;
    const authorPlaceholder = this.props.author ? this.props.author : this.props.post.author;

    return (
      <div>
        <header>
          <h1>Readable App</h1>
          <h4>Edit Post</h4>
        </header>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={titlePlaceholder}
            onChange={this.handleTitleChange}
            placeholder={titlePlaceholder}
          />
          <br />
          <textarea
            type="text"
            value={bodyPlaceholder}
            onChange={this.handleBodyChange}
            placeholder={bodyPlaceholder}
          />
          <br />
          <input type="text" value={authorPlaceholder} disabled />
          <p>Category: {this.props.post.category}</p>
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
      onTitleChange: value => newPostTitle(value),
      onBodyChange: value => newPostBody(value),
      onSubmit: (id, post) => editPost(id, post),
    },
    dispatch,
  );

export default connect(
  state => ({
    post: state.posts.post,
    title: state.posts.newPostTitle,
    body: state.posts.newPostBody,
    author: state.posts.newPostAuthor,
  }),
  mapDispatchToProps,
)(EditPost);
