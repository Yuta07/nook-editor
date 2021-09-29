import { Switch, Route } from 'react-router-dom'

import { Home } from './Home'
import { Layout } from './components/common/Layout'
import { Spinner } from './components/ui/Spinner'
import { useAuthState } from './contexts/auth'

export const App = () => {
	const state = useAuthState()

	if (state === undefined) return <Spinner message="Connecting..." />

	const { isLoading, loggedIn } = state

	if (isLoading) return <Spinner message="Now Loading..." />

	return (
		<Layout>
			{loggedIn ? (
				<Switch>
					<Route path="/">
						<div>/user path</div>
					</Route>
					<Route path="/articles/new">
						<div>/article new path</div>
					</Route>
					<Route path="/articles/:article_id">
						<div>/article show path</div>
					</Route>
				</Switch>
			) : (
				<Home />
			)}
		</Layout>
	)
}
