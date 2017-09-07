import { GET_POSTS, GET_ALL_POSTS, ADD_POST, NEW_POST_TITLE, NEW_POST_BODY, NEW_POST_AUTHOR, NEW_POST_CATEGORY, loadPosts, loadAllPosts} from '../actions'
import { getPosts, getAllPosts, addNewPost } from '../util/PostsAPI'

const initialPostsState = {
	posts: [],
	newPostTitle: '',
	newPostBody: '',
	newPostAuthor: '',
	newPostCategory: 'react'
}

export default (state = initialPostsState, action) => {
	switch(action.type){
	case GET_POSTS: 
		return {...state, posts: action.post}
	case GET_ALL_POSTS: 
		return {...state, posts: action.post}
	case ADD_POST: 
		return {...state, posts: action.post}
	case NEW_POST_TITLE: 
		return {...state, newPostTitle: action.value}
	case NEW_POST_BODY: 
		return {...state, newPostBody: action.value}
	case NEW_POST_AUTHOR: 
		return {...state, newPostAuthor: action.value}
	case NEW_POST_CATEGORY: 
		return {...state, newPostCategory: action.value}
	default:
		return state
	}
}

export const fetchPosts = (category) => {
	return (dispatch) => {
		getPosts(category)
			.then(posts => dispatch(loadPosts(posts)))
	}
}

export const fetchAllPosts = () => {
	return (dispatch) => {
		getAllPosts()
			.then(posts => dispatch(loadAllPosts(posts)))
	}
}

export const sendPost = (post) => {
	return (dispatch) => {
		addNewPost(post)
			.then(posts => dispatch(loadAllPosts(posts)))
	}
}