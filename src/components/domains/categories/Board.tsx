import { VFC } from 'react'

import { Card } from './Card'
import { CategoryState, useCategoriesState } from '../../../contexts/categories'
import { useFetchCategories } from '../../../hooks/useCategories'

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
				<h3 className="category-board-hero">Registered category</h3>
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
	useFetchCategories()

	const state = useCategoriesState()

	return (
		<div className="category-board-container">
			{state === null || state.categories === null ? null : <CategoryListUI categories={state.categories} />}
		</div>
	)
}
