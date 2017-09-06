import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortCategories } from '../actions'
import '../App.css'

class SortBy extends Component {
	constructor(props) {
		super(props)
    
		this.handleOptionChange = this.handleOptionChange.bind(this)
	}
    
	handleOptionChange(e) {
		this.props.onSort(e.target.value)
	}
	render() {

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

const mapDispatchToProps = dispatch => {
	return {
		onSort: value => {dispatch(sortCategories(value))}
	}
}
export default connect(
	(state) => ({sortBy: state.categories.sortBy}), 
	mapDispatchToProps
)(SortBy)