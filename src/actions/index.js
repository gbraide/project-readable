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
export const NEW_POST_TITLE = 'NEW_POST_TITLE'
export const NEW_POST_BODY = 'NEW_POST_BODY'
export const NEW_POST_AUTHOR = 'NEW_POST_AUTHOR'
export const NEW_POST_CATEGORY = 'NEW_POST_CATEGORY'
export const SORT_COMMENTS = 'SORT_COMMENTS'

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
export const addPost = post => ({
	type: ADD_POST,
	post
})
export const newPostTitle = value => ({
	type: NEW_POST_TITLE,
	value
})
export const newPostBody = value => ({
	type: NEW_POST_BODY,
	value
})
export const newPostAuthor = value => ({
	type: NEW_POST_AUTHOR,
	value
})
export const newPostCategory = value => ({
	type: NEW_POST_CATEGORY,
	value
})
export const getSinglePost = post => ({
	type: GET_SINGLE_POST,
	post
})
export const deleteSinglePost = post => ({
	type: DELETE_POST,
	post
})

//Comment Action Creators
export const getComments = comments => ({
	type: GET_COMMENTS,
	comments
})
export const addComment = comment => ({
	type: ADD_COMMENT,
	comment
})
export const getSingleComment = comment => ({
	type: COMMENT_DETAILS,
	comment
})
export const commentVote = comment => ({
	type: COMMENT_VOTE,
	comment
})
export const editDetailsComment = comment => ({
	type: EDIT_COMMENT,
	comment
})
export const deleteSingleComment = comment => ({
	type: DELETE_COMMENT,
	comment
})
export const sortComments = sortOption => ({
	type: SORT_COMMENTS,
	sortOption
})