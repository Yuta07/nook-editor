import React, { useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import { Input } from 'components/ui/Input'

import './filter.scss'

type Props = {
	fetchArticles: (searchTxt: string) => void
}

export const Filter = ({ fetchArticles }: Props) => {
	const [searchTxt, setSearchTxt] = useState('')
	// const [category, setCategory] = useState(null)

	const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setSearchTxt(e.currentTarget.value)
	}, [])

	const handleSubmitArticlesSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		fetchArticles(searchTxt)
	}

	return (
		<div className="articles-filter-container">
			<form className="articles-filter-search-form" onSubmit={handleSubmitArticlesSearch}>
				<Input
					name="articles-search-title"
					type="text"
					value={searchTxt}
					placeholder="Search by title..."
					className="articles-filter-input"
					onChange={handleInputChange}
				/>
				<button name="articles-search-button" type="submit" className="articles-filter-button">
					<FaSearch size={16} color="var(--color-gray)" />
				</button>
			</form>
		</div>
	)
}
