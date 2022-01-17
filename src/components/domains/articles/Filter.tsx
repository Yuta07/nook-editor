import React, { useCallback, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'

import { useCategoriesState } from '../../../contexts/categories'
import { Input } from '../../ui/Input'

import './filter.scss'

type Props = {
	fetchArticles: (searchTxt: string, categoyId: number | null) => void
}

export const Filter = ({ fetchArticles }: Props) => {
	const [searchTxt, setSearchTxt] = useState('')
	const [category, setCategory] = useState<{ label: string; value: number } | null>(null)

	const [appCategories, setAppCategories] = useState<{ label: string; value: number }[]>([])

	const history = useHistory()

	const search = useLocation().search
	const query = new URLSearchParams(search)
	const searchResult = query.get('q') || ''

	const params = new URLSearchParams()

	const state = useCategoriesState()

	useEffect(() => {
		if (searchResult) {
			setSearchTxt(searchResult)
		}
	}, [])

	useEffect(() => {
		if (state.categories === null) return

		const mapCategories = state.categories.map((category) => {
			return { label: category.name, value: category.id }
		})

		setAppCategories(mapCategories)
	}, [state.categories])

	const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setSearchTxt(e.currentTarget.value)
	}, [])

	const handleChangeCategories = useCallback(
		(newValue: SingleValue<{ label: string; value: number }>) => {
			setCategory(newValue)

			const categoyId = newValue?.value as number

			fetchArticles(searchTxt, categoyId)
		},
		[searchTxt, category]
	)

	const handleSubmitArticlesSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const categoryId = category === null ? null : category.value

		if (searchTxt) {
			params.append('q', searchTxt)
			history.push({ search: params.toString() })
		} else {
			params.delete('q')
			history.push({ search: '' })
		}

		fetchArticles(searchTxt, categoryId)
	}

	return (
		<div className="articles-filter-container">
			<div className="articles-filter-inner">
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
				<Select
					name="article-search-categories"
					options={appCategories}
					className="article-filter-search-category"
					classNamePrefix="article-filter-select"
					menuPortalTarget={document.body}
					styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
					onChange={handleChangeCategories}
				/>
			</div>
			{searchResult ? <p className="articles-filter-search-result">Search result for `{searchResult}`</p> : null}
		</div>
	)
}
