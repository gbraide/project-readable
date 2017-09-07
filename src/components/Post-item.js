import React, { Component } from 'react'
import { push } from 'react-router-redux'
import store from '../store'

class PostItem extends Component {
	constructor(props) {
		super(props)
    
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(){
		store.dispatch(push(`/post/${this.props.post.id}`))	
	}
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
				<button onClick={this.handleClick}>Post Detail</button>
			</section>
		)
	}
}

export default PostItem