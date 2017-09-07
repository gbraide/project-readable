import { GET_COMMENTS, getComments} from '../actions'
import { getAllComments } from '../util/CommentsAPI'

const initialCommentsState = {
	allComments: [],
	sortCommentsBy: 'voteScore'
}

export default (state = initialCommentsState, action) => {
	switch(action.type){
	case GET_COMMENTS: 
		return {...state, allComments: action.comments}
	default:
		return state
	}
}

export const fetchAllComments = (id) => {
	return (dispatch) => {
		getAllComments(id)
			.then(allComments => dispatch(getComments(allComments)))
	}
}