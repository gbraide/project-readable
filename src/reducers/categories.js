import { GET_ALL_CATEGORIES, loadCategories, SORT_CATEGORIES} from '../actions'
import { getAllCategories } from '../util/CategoriesAPI'

const initialCategoriesState = {
	allCategories: [],
	sortBy: 'voteScore'
}

export default (state = initialCategoriesState, action) => {
	switch(action.type){
	case GET_ALL_CATEGORIES: 
		return {...state, allCategories: action.categories}
	case SORT_CATEGORIES: 
		return {...state, sortBy: action.sortOption}
	default:
		return state
	}
}

export const fetchCategories = () => {
	return (dispatch) => {
		getAllCategories()
			.then(allCategories => dispatch(loadCategories(allCategories)))
	}
}
