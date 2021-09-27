import { Switch, Route } from 'react-router-dom'

export const App = () => {
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
