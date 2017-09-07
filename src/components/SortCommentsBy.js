import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sortComments } from '../actions'

class SortCommentsBy extends Component {
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
	onSort: (value) => sortComments(value)
}, dispatch)

export default connect(
	(state) => ({sortBy: state.categories.sortBy}), 
	mapDispatchToProps
)(SortCommentsBy)