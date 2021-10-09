import { Link } from 'react-router-dom'

import { List } from './List'
import { Spinner } from 'components/ui/Spinner'
import { useFetchArticles } from 'hooks/useArticles'

import './articles.scss'

export const Articles = () => {
	const [{ articles, isLoading }] = useFetchArticles()

	return (
		<div className="articles-container">
			<div className="articles-header">
				<h2 className="articles-hero">Articles</h2>
				<Link to="/articles/new" className="articles-new-button">
					Add new
				</Link>
			</div>
			<div className="articles-content">
				{isLoading ? <Spinner /> : null}
				{articles === null
					? null
					: articles.map((article) => {
							return <List key={article.slug} article={article} />
					  })}
			</div>
		</div>
	)
}
