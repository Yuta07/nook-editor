import { Link } from 'react-router-dom'

import { useAuthState } from '../../contexts/auth/index'
import { ReactComponent as Logo } from './logo.svg'

import './header.scss'

export const Header = () => {
	const state = useAuthState()

	return (
		<header className="header">
			<div className="header-wide">
				<div className={state?.loggedIn ? 'header-inner-auth' : 'header-inner'}>
					<Link to="/" className="header-logo-link">
						<Logo />
					</Link>
					{state?.loggedIn ? (
						<nav>
							<p>navigation</p>
						</nav>
					) : null}
				</div>
			</div>
		</header>
	)
}
