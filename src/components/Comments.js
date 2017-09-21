import React from 'react';
import CommentItem from './Comment-item';
import _ from 'lodash';

export const Comments = (props) => {
  const list = [];
  if (!_.isEmpty(props)) {
    const sortValue = props.sortOrder === 'time' ? 'timestamp' : props.sortOrder;
    const activeComments = _.filter(props.comments, ['deleted', false]);
    const sortedList = _.orderBy(activeComments, [sortValue], ['desc']);
    sortedList.forEach((comment) => {
      list.push(
        <li className="list-group-item" key={comment.id}>
          <CommentItem comment={comment} />
        </li>,
      );
    });
  }
  return <ul className="list-group">{list}</ul>;
};
