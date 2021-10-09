import { Link } from 'react-router-dom'

import { useCategoriesState } from 'contexts/categories'
import { ArticleType } from 'types'

import './list.scss'

type Props = {
	article: ArticleType
}

export const List = ({ article }: Props) => {
	const state = useCategoriesState()

	if (state.categories === null) return null

	const articleCategories = state.categories.filter((category) => {
		const result = article.categories.find((cate) => {
			return cate === category.id
		})

		if (result === undefined) return

		return result
	})

	return (
		<Link
			to={`/articles/${article.slug}`}
			className={`articles-list-container ${
				article.ispublished ? 'articles-list-point-publish' : 'articles-list-point-draft'
			}`}
		>
			<div className="articles-list-header">
				<h3 className="articles-list-title">{article.title}</h3>
				<time className="articles-list-time">{article.created_at.toString().slice(0, 10)}</time>
			</div>
			{article.word ? <p className="articles-list-word">{article.word}</p> : null}
			<div className="articles-list-footer">
				<div className="articles-list-categories">
					{articleCategories.map((category, i) => {
						return (
							<p key={i} className="articles-list-category">
								{category.name}
							</p>
						)
					})}
				</div>
				<span className="articles-list-ispublish">{article.ispublished ? 'Publish' : 'Draft'}</span>
			</div>
		</Link>
	)
}
