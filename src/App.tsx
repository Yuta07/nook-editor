import { Switch, Route } from 'react-router-dom'

import { useAuthState } from './contexts/auth'
import { Spinner } from './components/ui/Spinner'

export const App = () => {
	const state = useAuthState()

	if (state === undefined) return <Spinner message="Connecting..." />

	const { isLoading, loggedIn } = state

	if (isLoading) return <Spinner message="Now Loading..." />

	return loggedIn ? (
		<Switch>
			<Route path="/articles/new">
				<div>/article new path</div>
			</Route>
			<Route path="/articles/:article_id">
				<div>/article show path</div>
			</Route>
			<Route path="/user">
				<div>/user path</div>
			</Route>
		</Switch>
	) : (
		<>
			<div>asdf</div>
		</>
	)
}
