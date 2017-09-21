import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavMenu from './Nav-menu';
import { newPostTitle, newPostBody, newPostAuthor, newPostCategory } from '../actions';
import { fetchAllCategories } from '../reducers/categories';
import { sendPost } from '../reducers/posts';

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllCategories();
  }
  handleTitleChange(e) {
    this.props.onTitleChange(e.target.value);
  }
  handleBodyChange(e) {
    this.props.onBodyChange(e.target.value);
  }
  handleAuthorChange(e) {
    this.props.onAuthorChange(e.target.value);
  }
  handleOptionChange(e) {
    this.props.onCategoryChange(e.target.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    const base64Title = new Buffer(this.props.title).toString('base64');
    const timestamp = Date.now();
    const id = base64Title + timestamp;
    const title = this.props.title;
    const body = this.props.body;
    const author = this.props.author;
    const category = this.props.category;
    this.props.onSubmit({
      id,
      timestamp,
      title,
      body,
      author,
      category,
    });
    this.props.history.push('/');
  }
  handleCancel() {
    this.props.history.push('/');
  }
  render() {
    const categoriesList = [];
    if (this.props.categoriesList) {
      this.props.categoriesList.forEach((category) => {
        categoriesList.push(
          <div className="radio" key={category.name}>
            <label>
              <input
                type="radio"
                onChange={this.handleOptionChange}
                value={category.name}
                checked={this.props.category === category.name}
              />
              {category.name}
            </label>
          </div>,
        );
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <header className="page-header">
              <NavMenu />
              <h4>Add New Post</h4>
            </header>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.props.title}
                  onChange={this.handleTitleChange}
                  placeholder="Enter Title..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  value={this.props.body}
                  onChange={this.handleBodyChange}
                  placeholder="Enter Description..."
                />
              </div>
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
              {categoriesList}
              <br />
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
      fetchAllCategories: () => fetchAllCategories(),
      onTitleChange: value => newPostTitle(value),
      onBodyChange: value => newPostBody(value),
      onAuthorChange: value => newPostAuthor(value),
      onCategoryChange: value => newPostCategory(value),
      onSubmit: post => sendPost(post),
    },
    dispatch,
  );

export default connect(
  state => ({
    categoriesList: state.categories.allCategories,
    title: state.posts.newPostTitle,
    body: state.posts.newPostBody,
    author: state.posts.newPostAuthor,
    category: state.posts.newPostCategory,
  }),
  mapDispatchToProps,
)(AddPost);
