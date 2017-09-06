export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'//Get all of the categories available for the app.
export const GET_POSTS = 'GET_POSTS'//Get all of the posts for a particular category. 
export const GET_ALL_POSTS = 'GET_ALL_POSTS'//Get all of the posts.
export const ADD_POST = 'ADD_POST'//Add a new post.
export const GET_SINGLE_POST = 'GET_SINGLE_POST'//Get the details of a single post.
export const POST_VOTE = 'POST_VOTE'//Used for voting on a post.
export const EDIT_POST = 'EDIT_POST'//Edit the details of an existing post.
export const DELETE_POST = 'DELETE_POST'//Sets the deleted flag for a post to 'true'.
export const GET_COMMENTS = 'GET_COMMENTS'//Get all the comments for a single post.
export const ADD_COMMENT = 'ADD_COMMENT'//Add a comment to a post.
export const COMMENT_DETAILS = 'COMMENT_DETAILS'//Get the details for a single comment.
export const COMMENT_VOTE = 'COMMENT_VOTE'//Used for voting on a comment.
export const EDIT_COMMENT = 'EDIT_COMMENT'//Edit the details of an existing comment.
export const DELETE_COMMENT = 'DELETE_COMMENT'//Sets a comment's deleted flag to 'true'.
export const SORT_CATEGORIES = 'SORT_CATEGORIES'

//Action creators
export const loadCategories = categories => ({
	type: GET_ALL_CATEGORIES,
	categories
})
export const sortCategories = sortOption => ({
	type: SORT_CATEGORIES,
	sortOption
})
export const loadPosts = post => ({
	type: GET_POSTS,
	post
})
export const loadAllPosts = post => ({
	type: GET_ALL_POSTS,
	post
})