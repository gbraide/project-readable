import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSinglePost, deleteSinglePost } from '../reducers/posts'

class PostDetail extends Component {
	constructor(props) {
		super(props)
    
		this.handleEdit = this.handleEdit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	handleEdit(){
		this.props.history.push(`/post/${this.props.post.id}/edit-post`)
	}
	handleDelete(){
		this.props.onDeletePost(this.props.match.params.id)
		this.props.history.push('/')
	}
	componentDidMount(){
		this.props.fetchSinglePost(this.props.match.params.id)
	}
	render() {
		const post = this.props.post
		const convertTimestamp = new Date(post.timestamp)
		const date = convertTimestamp.toString()
        
		return (
			<div>
				<header>
					<h1>Readable App</h1>
				</header>
				<article>
					<div style={{float: 'right'}}><small> Score: {post.voteScore}</small></div>
					<h4>{post.title}</h4>
					<div>
						<span><cite>Author: {post.author} </cite>|</span>
						<span><cite> Category: {post.category} </cite>|</span>
					</div>
					<cite><small> {date}</small></cite>
					<div>
						<span><button onClick={this.handleEdit}>Edit Post</button></span>
						<span><button onClick={this.handleDelete}>Delete Post</button></span>
					</div>
					
					<hr/>
					<p>{post.body}</p>
				</article>			
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ 
	fetchSinglePost: (id) => fetchSinglePost(id),
	onDeletePost: (id) => deleteSinglePost(id)
}, dispatch)

export default connect(
	(state) => ({post: state.posts.post}), 
	mapDispatchToProps
)(PostDetail)