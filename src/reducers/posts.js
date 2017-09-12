import {
  GET_POSTS,
  GET_ALL_POSTS,
  ADD_POST,
  NEW_POST_TITLE,
  NEW_POST_BODY,
  NEW_POST_AUTHOR,
  NEW_POST_CATEGORY,
  GET_SINGLE_POST,
  loadPosts,
  loadAllPosts,
  getSinglePost,
} from '../actions';

import {
  getPosts,
  getAllPosts,
  addNewPost,
  getPost,
  deletePost,
  editExistingPost,
} from '../util/PostsAPI';

const initialPostsState = {
  posts: [],
  post: [],
  newPostTitle: '',
  newPostBody: '',
  newPostAuthor: '',
  newPostCategory: 'react',
};

export default (state = initialPostsState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.post };
    case GET_ALL_POSTS:
      return { ...state, posts: action.post };
    case ADD_POST:
      return { ...state, posts: action.post };
    case NEW_POST_TITLE:
      return { ...state, newPostTitle: action.value };
    case NEW_POST_BODY:
      return { ...state, newPostBody: action.value };
    case NEW_POST_AUTHOR:
      return { ...state, newPostAuthor: action.value };
    case NEW_POST_CATEGORY:
      return { ...state, newPostCategory: action.value };
    case GET_SINGLE_POST:
      return { ...state, post: action.post };
    default:
      return state;
  }
};

export const fetchSinglePost = id => (dispatch) => {
  getPost(id).then(post => dispatch(getSinglePost(post)));
};
export const fetchPosts = category => (dispatch) => {
  getPosts(category).then(posts => dispatch(loadPosts(posts)));
};

export const fetchAllPosts = () => (dispatch) => {
  getAllPosts().then(posts => dispatch(loadAllPosts(posts)));
};

export const sendPost = post => (dispatch) => {
  addNewPost(post).then(posts => dispatch(loadAllPosts(posts)));
};

export const editPost = (id, editedPost) => (dispatch) => {
  editExistingPost(id, editedPost).then(post => dispatch(getSinglePost(post)));
};

export const deleteSinglePost = id => (dispatch) => {
  deletePost(id).then(post => dispatch(loadAllPosts(post)));
};
