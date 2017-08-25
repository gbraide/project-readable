import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import loading from './loading'

export default combineReducers({
	routerReducer,
	categories,
	posts,
	comments,
	loading
})