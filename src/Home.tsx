import { AuthSection } from './components/domains/home/AuthSection'
import { Cta } from './components/domains/home/Cta'

import './styles/home.scss'

export const Home = () => {
	return (
		<div className="home-container">
			<div className="home-cta-container">
				<Cta />
			</div>
			<div className="home-auth-container">
				<AuthSection />
				<p className="home-copyright">© 2021 nook by yutaka miyazaki</p>
			</div>
		</div>
	)
}
