import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
	return (
		<Switch>
			<Route path="/">
				<div>/ path</div>
			</Route>
			<Route path="/user">
				<div>/user path</div>
			</Route>
			<Route path="/user/article">
				<div>/ user article</div>
			</Route>
		</Switch>
	)
}

export default App
