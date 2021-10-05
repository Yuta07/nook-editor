import { Board } from './Board'
import { New } from './New'

import './categories.scss'

export const Categories = () => {
	return (
		<div className="categories-section">
			<h2 className="categories-hero">Categories</h2>
			<New />
			<Board />
		</div>
	)
}
