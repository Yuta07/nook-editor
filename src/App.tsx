import { Switch, Route } from 'react-router-dom'

import { Home } from './Home'
import { User } from './User'
import { Layout } from './components/common/Layout'
import { ArticleEdit } from './components/domains/articles/Edit'
import { ArticleNew } from './components/domains/articles/New'
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
					<Route path="/articles/new">
						<ArticleNew />
					</Route>
					<Route path="/articles/:article_slug">
						<ArticleEdit />
					</Route>
					<Route path="/" component={() => <User />} />
				</Switch>
			) : (
				<Home />
			)}
		</Layout>
	)
}
