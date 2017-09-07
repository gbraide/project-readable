const api = 'http://localhost:5001'

const user = 'user'
const password = 'password'
const base64encodedData = new Buffer(user + ':' + password).toString('base64')

const headers = {
	'Authorization': 'Basic ' + base64encodedData,
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}
export const getAllComments = (id) =>
	fetch(`${api}/posts/${id}/comments`, { headers })
		.then(res => res.json())

export const postComment = (body) =>
	fetch(`${api}/comments`,{
		method: 'POST',
		headers: {...headers},
		body: JSON.stringify(body)
	})
		.then(res => res.json())

export const getSingleComments = (id) =>
	fetch(`${api}/comments/${id}`, { headers })
		.then(res => res.json())

export const voteOnComment = (id) =>
	fetch(`${api}/comments/${id}`,{
		method: 'POST',
		headers: {...headers}
	})
		.then(res => res.json())  
        
export const editExistingComment = (id, body) =>
	fetch(`${api}/comments/${id}`,{
		method: 'PUT',
		headers: {...headers},
		body: JSON.stringify(body)
	})
		.then(res => res.json())

export const deleteComment = (id) =>
	fetch(`${api}/comments/${id}`,{
		method: 'DELETE',
		headers: {...headers}
	})
		.then(res => res.json())