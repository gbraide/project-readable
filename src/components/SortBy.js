import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sortCategories } from '../actions'
import { fetchPosts, fetchAllPosts } from '../reducers/posts'
import '../App.css'

class SortBy extends Component {
	constructor(props) {
		super(props)
    
		this.handleOptionChange = this.handleOptionChange.bind(this)
	}
	componentDidMount(){
		if(this.props.category === 'all'){
			this.props.fetchAllPosts()
		}else{
			this.props.fetchPosts(this.props.category)  
		}
	} 
	handleOptionChange(e) {
		this.props.onSort(e.target.value)
	}
	render() {
        console.log(this.props.posts)//TODO: Render returned post for each category
		return (
			<form>
				<div className="radio">
					<label>
						<input type="radio" onChange={this.handleOptionChange} value="voteScore" checked={this.props.sortBy === 'voteScore'} />
                        Vote Score
					</label>
				</div>
				<div className="radio">
					<label>
						<input type="radio" onChange={this.handleOptionChange} value="time" checked={this.props.sortBy === 'time'} />
                        Time
					</label>
				</div>
			</form>
		)
	}
}
const mapDispatchToProps = dispatch => bindActionCreators({ 
	onSort: (value) => sortCategories(value),
	fetchPosts: (category) => fetchPosts(category),
	fetchAllPosts: () => fetchAllPosts()
}, dispatch)

export default connect(
	(state) => ({sortBy: state.categories.sortBy, posts: state.posts.posts}), 
	mapDispatchToProps
)(SortBy)