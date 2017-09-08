import {
  GET_COMMENTS,
  SORT_COMMENTS,
  ADD_COMMENT,
  NEW_COMMENT_BODY,
  NEW_COMMENT_AUTHOR,
  COMMENT_DETAILS,
  getComments,
  getSingleComment,
} from '../actions';
import {
  getAllComments,
  postComment,
  getSingleComments,
  editExistingComment,
  deleteComment,
} from '../util/CommentsAPI';

const initialCommentsState = {
  allComments: [],
  comment: [],
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
    case COMMENT_DETAILS:
      return { ...state, comment: action.comment };
    default:
      return state;
  }
};

export const fetchAllComments = id => (dispatch) => {
  getAllComments(id).then(allComments => dispatch(getComments(allComments)));
};

export const sendComment = _comment => (dispatch) => {
  postComment(_comment).then(comment => dispatch(getSingleComment(comment)));
};

export const fetchSingleComment = id => (dispatch) => {
  getSingleComments(id).then(comment => dispatch(getSingleComment(comment)));
};
export const editComment = (id, comment) => (dispatch) => {
  editExistingComment(id, comment).then(allComments => dispatch(getComments(allComments)));
};
export const deleteSingleComment = id => (dispatch) => {
  deleteComment(id).then(allComments => dispatch(getComments(allComments)));
};
