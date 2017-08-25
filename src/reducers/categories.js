import { GET_ALL_CATEGORIES, loadCategories} from '../actions'
import { getAllCategories } from '../util/CategoriesAPI'

const initialAllCategoriesState = {
	allCategories: []
}

export default (state = initialAllCategoriesState, action) => {
	switch(action.type){
    case GET_ALL_CATEGORIES: 
		return {...state, allCategories: action.categories}
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