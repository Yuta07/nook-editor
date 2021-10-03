import { Link } from 'react-router-dom'

import './articles.scss'

export const Articles = () => {
	return (
		<div className="articles-container">
			<div className="articles-header">
				<h2 className="articles-hero">Articles</h2>
				<Link to="/articles/new" className="articles-new-button">
					Add new
				</Link>
			</div>
			<div className="articles-content">here is content</div>
		</div>
	)
}
