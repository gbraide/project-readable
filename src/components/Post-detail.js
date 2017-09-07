import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSinglePost } from '../reducers/posts'

class PostDetail extends Component {
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
					<h4>{post.title}</h4>
					<div>
						<span><cite>Author: {post.author} </cite>|</span>
						<span><cite><small> Score: {post.voteScore}</small></cite></span>
					</div>
					<cite><small> {date}</small></cite>
					<hr/>
					<p>{post.body}</p>
				</article>			
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ 
	fetchSinglePost: (id) => fetchSinglePost(id)
}, dispatch)

export default connect(
	(state) => ({post: state.posts.post}), 
	mapDispatchToProps
)(PostDetail)