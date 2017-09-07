import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import AddPost from './Add-post'
import '../App.css'

const NoMatch = ({ location }) => (
	<div>
		<p>No match for <code>{location.pathname}</code></p>         
	</div> 
)

const App = () => (
	<div>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/add-post" component={AddPost} />
			<Route component={NoMatch}/>
		</Switch>
	</div>
)
export default App