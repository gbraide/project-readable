import React, { Component } from 'react';
import { push } from 'react-router-redux';
import store from '../store';

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    store.dispatch(
      push(`/post/${this.props.comment.parentId}/edit-comment/${this.props.comment.id}`),
    );
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
            </cite>|
          </span>
          <span>
            <cite>
              <small> Score: {comment.voteScore}</small>
            </cite>
          </span>
        </div>
        <p>{comment.body}</p>
        <button onClick={this.handleClick}>Comment Detail</button>
      </section>
    );
  }
}

export default CommentItem;
