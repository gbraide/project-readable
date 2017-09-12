import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import store from '../store';
import { postVote } from '../reducers/posts';

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
  }
  handleDownVote() {
    this.props.downVotePost(this.props.post.id, { option: 'downVote' });
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
              <small> Score: {post.voteScore} </small>
              <small>
                <button onClick={this.handleUpVote}>Up Vote</button>
              </small>
              <small>
                <button onClick={this.handleDownVote}>Down vote</button>
              </small>
            </cite>
          </div>
        </div>
        <hr />
        <small> Category: {post.category} |</small>
        <button onClick={this.handleClick}>Post Detail</button>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      upVotePost: (id, vote) => postVote(id, vote),
      downVotePost: (id, vote) => postVote(id, vote),
    },
    dispatch,
  );
export default connect(null, mapDispatchToProps)(PostItem);
