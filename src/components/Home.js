import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SortBy from './SortBy'
import { Posts } from './Posts'
import { fetchAllCategories } from '../reducers/categories'
import { fetchPosts, fetchAllPosts } from '../reducers/posts'

class Home extends Component {
	constructor(props) {
		super(props)
    
		this.handleClick = this.handleClick.bind(this)
		this.handlePostAdd = this.handlePostAdd.bind(this)
	}
	componentDidMount(){
		this.props.fetchAllCategories()
		this.props.fetchAllPosts()
	}
	handleClick(e){
		if(e.target.value === 'All'){
			this.props.fetchAllPosts()
		}else{
			this.props.fetchPosts(e.target.value)
		}
	}
	handlePostAdd(){
		this.props.history.push('/add-post')
	}
	render() {
		const categoriesList = []
		if(this.props.categoriesList){
			this.props.categoriesList.forEach((category) => {
				categoriesList.push(<span key={category.name}><input type="button" onClick={this.handleClick} value={category.name}/></span>)
			})	
		}
		return (
			<div>
				<header>
					<h1>Readable App</h1>
				</header>
				<nav>
					<form>
						<span><input type="button" key="All" onClick={this.handleClick} value="All"/></span>
						{categoriesList}
					</form>
				</nav>
				<section>
					<SortBy />
					<button onClick={this.handlePostAdd}>Add Post</button>
					<Posts posts={this.props.posts} sortOrder={this.props.sortBy} />
				</section>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ 
	fetchAllCategories: () => fetchAllCategories(),
	fetchAllPosts: () => fetchAllPosts(),
	fetchPosts: (category) => fetchPosts(category)
}, dispatch)

export default connect(
	(state) => ({categoriesList: state.categories.allCategories, sortBy: state.categories.sortBy, posts: state.posts.posts}), 
	mapDispatchToProps
)(Home)