import { VFC } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Account } from './components/domains/account'
import { Articles } from './components/domains/articles'
import { Categories } from './components/domains/categories'
import { Edit } from './components/domains/categories/Edit'
import { Password } from './components/domains/password'

import './styles/user.scss'

const routes = [
	{ path: '/', exact: true, component: Articles },
	{ path: '/categories', exact: true, component: Categories },
	{ path: '/categories/:name', exact: false, component: Edit },
	{ path: '/account', exact: false, component: Account },
	{ path: '/password', exact: false, component: Password },
]

const UserContentUI: VFC = () => {
	return (
		<Switch>
			{routes.map((route, i) => {
				return <Route key={i} exact={route.exact} path={route.path} render={() => <route.component />} />
			})}
		</Switch>
	)
}

export const User = () => {
	const { pathname } = window.location

	return (
		<div className="user-container">
			<div>
				<nav className="user-data-nav">
					<span className="user-nav-title">All Data</span>
					<Link to="/" className={pathname === '/' ? 'user-selected-tab-type' : 'user-tab-type'}>
						Articles
					</Link>
					<Link to="/categories" className={pathname === '/categories' ? 'user-selected-tab-type' : 'user-tab-type'}>
						Categories
					</Link>
				</nav>
				<nav className="user-settigns-nav">
					<span className="user-nav-title">Account Settings</span>
					<Link to="/account" className={pathname === '/account' ? 'user-selected-tab-type' : 'user-tab-type'}>
						Account
					</Link>
					<Link to="/password" className={pathname === '/password' ? 'user-selected-tab-type' : 'user-tab-type'}>
						Password
					</Link>
				</nav>
			</div>
			<div className="user-content">
				<UserContentUI />
			</div>
		</div>
	)
}
