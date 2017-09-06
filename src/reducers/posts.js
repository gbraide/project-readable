import { GET_POSTS, GET_ALL_POSTS, loadPosts, loadAllPosts } from '../actions'
import { getPosts, getAllPosts } from '../util/PostsAPI'

const initialPostsState = {
	posts: []
}

export default (state = initialPostsState, action) => {
	switch(action.type){
	case GET_POSTS: 
		return {...state, posts: action.post}
	case GET_ALL_POSTS: 
		return {...state, posts: action.post}
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