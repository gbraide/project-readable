import {
  GET_COMMENTS,
  SORT_COMMENTS,
  ADD_COMMENT,
  NEW_COMMENT_BODY,
  NEW_COMMENT_AUTHOR,
  getComments,
} from '../actions';
import { getAllComments, postComment } from '../util/CommentsAPI';

const initialCommentsState = {
  allComments: [],
  sortCommentsBy: 'voteScore',
  newCommentBody: '',
  newCommentAuthor: '',
};

export default (state = initialCommentsState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, allComments: action.comments };
    case SORT_COMMENTS:
      return { ...state, sortCommentsBy: action.sortOption };
    case ADD_COMMENT:
      return { ...state, allComments: action.comment };
    case NEW_COMMENT_BODY:
      return { ...state, newCommentBody: action.value };
    case NEW_COMMENT_AUTHOR:
      return { ...state, newCommentAuthor: action.value };
    default:
      return state;
  }
};

export const fetchAllComments = id => (dispatch) => {
  getAllComments(id).then(allComments => dispatch(getComments(allComments)));
};

export const sendComment = comment => (dispatch) => {
  postComment(comment).then(allComments => dispatch(getComments(allComments)));
};
