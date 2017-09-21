import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import store from '../store';
import { postVote, fetchPosts, fetchAllPosts } from '../reducers/posts';

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }
  handleClick() {
    store.dispatch(push(`/post/${this.props.post.id}`));
  }
  handleUpVote() {
    this.props.upVotePost(this.props.post.id, { option: 'upVote' });
    this.updatePost(this.props.post.category);
  }
  handleDownVote() {
    this.props.downVotePost(this.props.post.id, { option: 'downVote' });
    this.updatePost(this.props.post.category);
  }
  updatePost(category) {
    if (window.location.pathname === '/') {
      this.props.fetchAllPosts();
    } else {
      this.props.fetchPosts(category);
    }
  }
  render() {
    const post = this.props.post;
    const convertTimestamp = new Date(post.timestamp);
    const date = convertTimestamp.toString();

    return (
      <section>
        <h4>{post.title}</h4>
        <div>
          <span>
            <cite>Author: {post.author} </cite>|
          </span>
          <span>
            <cite>
              <small> {date}</small>
            </cite>
          </span>
          <div>
            <cite>
              <small className="readable-post-score-btns"> Score: {post.voteScore} </small>
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
        <div>
          <small> Category: {post.category}</small>
        </div>
        <div>
          <button className="btn btn-info btn-sm" onClick={this.handleClick}>
            Post Detail
          </button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      upVotePost: (id, vote) => postVote(id, vote),
      downVotePost: (id, vote) => postVote(id, vote),
      fetchAllPosts: () => fetchAllPosts(),
      fetchPosts: category => fetchPosts(category),
    },
    dispatch,
  );
export default connect(null, mapDispatchToProps)(PostItem);
