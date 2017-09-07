import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sortCategories } from '../actions'

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
const mapDispatchToProps = dispatch => bindActionCreators({ 
	onSort: (value) => sortCategories(value)
}, dispatch)

export default connect(
	(state) => ({sortBy: state.categories.sortBy}), 
	mapDispatchToProps
)(SortBy)