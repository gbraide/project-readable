import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavMenu from './Nav-menu';
import SortCommentsBy from './SortCommentsBy';
import { Comments } from './Comments';
import { fetchSinglePost, deleteSinglePost, postVote } from '../reducers/posts';
import { fetchAllComments } from '../reducers/comments';
import _ from 'lodash';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCommentAdd = this.handleCommentAdd.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }
  handleUpVote() {
    this.props.upVotePost(this.props.match.params.id, { option: 'upVote' });
  }
  handleDownVote() {
    this.props.downVotePost(this.props.match.params.id, { option: 'downVote' });
  }
  handleEdit() {
    this.props.history.push(`/post/${this.props.post.id}/edit-post`);
  }
  handleDelete() {
    this.props.onDeletePost(this.props.match.params.id);
    this.props.history.push('/');
  }
  handleCommentAdd() {
    this.props.history.push(`/post/${this.props.match.params.id}/add-comment`);
  }
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.id);
    this.props.fetchAllComments(this.props.match.params.id);
  }
  render() {
    const post = this.props.post;
    const convertTimestamp = new Date(post.timestamp);
    const date = convertTimestamp.toString();
    if (_.isEmpty(post) || !post || post.error) {
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
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <article>
              <div style={{ float: 'right' }}>
                <small> Score: {post.voteScore}</small>
                <div>
                  <cite>
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
              </div>
              <h4>{post.title}</h4>
              <div>
                <span>
                  <cite>Author: {post.author} </cite>|
                </span>
                <span>
                  <cite> Category: {post.category} </cite>|
                </span>
              </div>
              <cite>
                <small> {date}</small>
              </cite>
              <div>
                <span className="readable-form-action-btns">
                  <button className="btn btn-warning btn-xs" onClick={this.handleEdit}>
                    Edit Post
                  </button>
                </span>
                <span className="readable-form-action-btns">
                  <button className="btn btn-danger btn-xs" onClick={this.handleDelete}>
                    Delete Post
                  </button>
                </span>
              </div>
              <hr />
              <p>{post.body}</p>
              <hr />
            </article>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <section>
              <h4>Comments</h4>
              <SortCommentsBy />
              <button className="btn btn-success btn-xs" onClick={this.handleCommentAdd}>
                Add Comment
              </button>
              <div className="readable-list-group">
                <Comments comments={this.props.comments} sortOrder={this.props.sortBy} />
              </div>
            </section>
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
      onDeletePost: id => deleteSinglePost(id),
      fetchAllComments: id => fetchAllComments(id),
      upVotePost: (id, vote) => postVote(id, vote),
      downVotePost: (id, vote) => postVote(id, vote),
    },
    dispatch,
  );

export default connect(
  state => ({
    post: state.posts.post,
    comments: state.comments.allComments,
    sortBy: state.comments.sortCommentsBy,
  }),
  mapDispatchToProps,
)(PostDetail);
