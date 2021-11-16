import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Select, { MultiValue, ActionMeta } from 'react-select'
import { OutputData } from '@editorjs/editorjs'

import { NookEditor } from '../../editor'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { useAuthState } from '../../../contexts/auth'
import { useCategoriesState } from '../../../contexts/categories'
import { useUIDispatch } from '../../../contexts/ui'
import { supabase } from '../../../supabase/supabaseClient'

import './new.scss'

export const ArticleNew = () => {
	const [title, setTitle] = useState('')
	const [word, setWord] = useState('')
	const [content, setContent] = useState<OutputData | undefined>(undefined)
	const [categories, setCategories] = useState<{ label: string; value: number }[]>([])
	const [isPublish, setIsPublish] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const [appCategories, setAppCategories] = useState<{ label: string; value: number }[]>([])

	const history = useHistory()

	const user = useAuthState()?.user
	const state = useCategoriesState()
	const uiDispatch = useUIDispatch()

	useEffect(() => {
		if (state.categories === null) return

		if (state.categories) {
			const mapCategories = state.categories.map((category) => {
				return { label: category.name, value: category.id }
			})

			setAppCategories(mapCategories)
		}
	}, [state.categories])

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget

		switch (name) {
			case 'article-title':
				setTitle(value)
				break
			case 'article-word':
				setWord(value)
				break
		}
	}, [])

	const handleChangeCategories = useCallback(
		(
			newValue: MultiValue<{ label: string; value: number }>,
			actionMeta: ActionMeta<{ label: string; value: number }>
		) => {
			if (actionMeta.option) {
				const mapNewValue = newValue.map((value) => {
					return value
				})

				setCategories(mapNewValue)
			} else {
				setCategories([])
			}
		},
		[categories]
	)

	const handleIsPublishChange = useCallback(() => {
		setIsPublish((prev) => !prev)
	}, [])

	const handleSubmitArticle = async () => {
		setIsLoading(true)

		try {
			const selectedCategories = categories.map((category) => {
				return category.value
			})

			const { error } = await supabase
				.from('articles')
				.insert([{ title, word, content, ispublished: isPublish, user_id: user?.id, categories: selectedCategories }])

			if (error) {
				uiDispatch?.showToast({ type: 'ERROR', message: 'Article creation failed.' })

				alert(error.message)
			} else {
				uiDispatch?.showToast({ type: 'SUCCESS', message: 'Successful article creation.' })

				history.push('/')
			}
		} catch (e) {
			uiDispatch?.showToast({ type: 'ERROR', message: 'Article creation failed.' })

			alert(e)
		} finally {
			setIsLoading(false)
		}
	}

	const disabled = title === ''

	return (
		<div className="article-new-container">
			<div className="article-new-header">
				<Input
					name="article-title"
					type="text"
					value={title}
					placeholder="Article title"
					className="article-new-title"
					onChange={handleInputChange}
				/>
				<div>
					<label className="article-new-switch">
						<input
							name="isPublish"
							type="checkbox"
							checked={isPublish}
							className="article-new-isPublish"
							onChange={handleIsPublishChange}
						/>
						<span className="article-new-slider" />
					</label>
					<Button
						name="article-new-button"
						type="button"
						className="article-new-publish-button"
						disabled={disabled || isLoading}
						onClick={handleSubmitArticle}
					>
						{isPublish ? 'Publish' : 'Save'}
					</Button>
				</div>
			</div>
			<div className="article-new-inner">
				<div className="article-new-word-inner">
					<span className="article-new-word-txt">
						<span className="article-new-word-emoji">🗣</span>Do you have a word?
					</span>
					<Input
						name="article-word"
						type="text"
						value={word}
						placeholder="If you have a word, please enter."
						className="article-new-word"
						onChange={handleInputChange}
					/>
				</div>
				<div className="article-new-categories-inner">
					<span className="article-new-category-txt">
						<span className="article-new-category-emoji">📚</span>Do you select categories?
					</span>
					<Select
						isMulti
						name="article-new-categories"
						options={appCategories}
						className="article-new-categories-select"
						classNamePrefix="article-new-select"
						menuPortalTarget={document.body}
						styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
						onChange={handleChangeCategories}
					/>
				</div>
				<div className="article-new-content-inner">
					<NookEditor content={content} handleChangeContent={setContent} />
				</div>
			</div>
		</div>
	)
}
