import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import loading from './loading_reducer'

export default combineReducers({
    routing: routerReducer,
    categories: categories,
    posts: posts,
    comments: comments,
    loading: loading
  })