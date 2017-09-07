import React, { Component } from 'react'

class PostItem extends Component {
	render() {
		const post = this.props.post
		return (
			<section> 
				<h4>{post.title}</h4>
				<div>
					<span><cite>Author: {post.author}</cite></span>
				</div>
				<hr/>
				<small>Time: {post.timestamp} |</small>
				<small> Category: {post.category} |</small>
				<small> Score: {post.voteScore}</small>
			</section>
		)
	}
}

export default PostItem