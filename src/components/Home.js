import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../reducers/categories'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import '../App.css'

class Home extends Component {
	componentDidMount(){
		this.props.fetchCategories()
	}
	render() {
		let tabs = []
		let tabPanels = []
		if(this.props.allCategories.categories){
			this.props.allCategories.categories.forEach((item) => {
				tabs.push(<Tab key={item.name} >{item.name}</Tab>)
				tabPanels.push(<TabPanel key={item.name} >{item.name}</TabPanel>)
			})		
		}
		
		return (
			<div>
				<Tabs>
					<TabList>
						{tabs}
					</TabList>
					{tabPanels}
				</Tabs>
			</div>
		)
	}
}

export default connect(
	(state) => ({allCategories: state.categories.allCategories}), 
	{fetchCategories}
)(Home)