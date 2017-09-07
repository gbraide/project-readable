const api = 'http://localhost:5001'

const user = 'user'
const password = 'password'
const base64encodedData = new Buffer(user + ':' + password).toString('base64')

const headers = {
	'Authorization': 'Basic ' + base64encodedData,
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}
  
export const getPosts = (category) =>
	fetch(`${api}/${category}/posts`, { headers })
		.then(res => res.json())

export const getAllPosts = () =>
	fetch(`${api}/posts`, { headers })
		.then(res => res.json())