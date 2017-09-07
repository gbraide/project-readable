import React, { Component } from 'react'

class PostItem extends Component {
	render() {
		const post = this.props.post
		const convertTimestamp = new Date(post.timestamp)
		const date = convertTimestamp.toString()

		return (
			<section> 
				<h4>{post.title}</h4>
				<div>
					<span><cite>Author: {post.author} </cite>|</span>
					<span><cite><small> {date}</small></cite></span>
				</div>
				<hr/>
				<small> Category: {post.category} |</small>
				<small> Score: {post.voteScore}</small>
			</section>
		)
	}
}

export default PostItem