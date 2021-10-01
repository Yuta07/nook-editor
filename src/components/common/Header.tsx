import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from './logo.svg'

import './header.scss'

export const Header = () => {
	return (
		<header className="header">
			<div className="header-wide">
				<div className="header-inner">
					<Link to="/" className="header-logo-link">
						<Logo />
					</Link>
				</div>
			</div>
		</header>
	)
}
