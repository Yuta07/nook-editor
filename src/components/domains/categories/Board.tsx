import { VFC } from 'react'

import { CategoryState, useCategoriesState } from '../../../contexts/categories'

import { Card } from './Card'

import './board.scss'

const CategoryEmptyUI = () => {
	return <h3>Category does not yet exist.</h3>
}

const CategoryListUI: VFC<{ categories: CategoryState[] }> = ({ categories }) => {
	if (categories.length === 0) {
		return <CategoryEmptyUI />
	} else {
		return (
			<>
				<h3 className="category-board-hero">Registered categories</h3>
				<div className="category-board-card-container">
					{categories.map((category) => {
						return <Card key={category.id} category={category} />
					})}
				</div>
			</>
		)
	}
}

export const Board = () => {
	const state = useCategoriesState()

	return (
		<div className="category-board-container">
			{state === null || state.categories === null ? null : <CategoryListUI categories={state.categories} />}
		</div>
	)
}
