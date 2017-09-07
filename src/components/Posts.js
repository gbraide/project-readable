import React from 'react'
import  PostItem  from './Post-item'
import _ from 'lodash'

export const Posts = (props) => {
	const list = []
	if(!_.isEmpty(props)){
		const sortValue = (props.sortOrder === 'time') ? 'timestamp' : props.sortOrder
		const activePosts = _.filter(props.posts, ['deleted', false])
		const sortedList = _.orderBy(activePosts, [sortValue], ['desc'])
		sortedList.forEach((post) => {
			list.push(<li key={post.id}><PostItem post={post} /></li>)
		})
	}
	return (
		<ul>
			{list}
		</ul>
	)
}