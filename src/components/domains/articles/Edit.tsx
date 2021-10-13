import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Select, { MultiValue, ActionMeta } from 'react-select'
import { OutputData } from '@editorjs/editorjs'

import { NookEditor } from 'components/editor'
import { Button } from 'components/ui/Button'
import { Input } from 'components/ui/Input'
import { Spinner } from 'components/ui/Spinner'
import { useAuthState } from 'contexts/auth'
import { useCategoriesState } from 'contexts/categories'
import { useUIDispatch } from 'contexts/ui'
import { useFetchArticle } from 'hooks/useArticles'
import { supabase } from 'supabase/supabaseClient'

import './edit.scss'

export const ArticleEdit = () => {
	const [id, setId] = useState(0)
	const [title, setTitle] = useState('')
	const [word, setWord] = useState('')
	const [content, setContent] = useState<OutputData | undefined>(undefined)
	const [categories, setCategories] = useState<{ label: string; value: number }[]>([])
	const [isPublish, setIsPublish] = useState(false)
	const [isActionLoading, setIsActionLoading] = useState(false)
	const [isSetting, setIsSetting] = useState(false)

	const [appCategories, setAppCategories] = useState<{ label: string; value: number }[]>([])

	const [{ article, isLoading }] = useFetchArticle()

	const user = useAuthState()?.user
	const state = useCategoriesState()
	const uiDispatch = useUIDispatch()

	const history = useHistory()

	useEffect(() => {
		if (article && state.categories) {
			setId(article.id)
			setTitle(article.title)
			setWord(article.word)
			setContent(article.content || undefined)
			setIsPublish(article.ispublished)

			if (article.categories) {
				const registeredCategories = state.categories.map((category) => {
					if (state.categories === null) return

					const result = article.categories.find((cate) => {
						return cate === category.id
					})

					if (result === undefined) return

					return { label: category.name, value: category.id }
				})

				const convertCategories = registeredCategories.filter((category) => {
					return category !== undefined
				})

				setCategories(convertCategories as { label: string; value: number }[])
			}

			setIsSetting(true)
		}
	}, [article, state.categories])

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

	const handleUpdateArticle = async () => {
		setIsActionLoading(true)

		try {
			const selectedCategories = categories.map((category) => {
				return category.value
			})

			const { error } = await supabase
				.from('articles')
				.update({ title, word, content, ispublished: isPublish, user_id: user?.id, categories: selectedCategories })
				.eq('id', id)

			if (error) {
				uiDispatch?.showToast({ type: 'ERROR', message: 'Article update failed.' })

				alert(error.message)
			} else {
				uiDispatch?.showToast({ type: 'SUCCESS', message: 'Successful article update.' })
			}
		} catch (e) {
			uiDispatch?.showToast({ type: 'ERROR', message: 'Article update failed.' })

			alert(e)
		} finally {
			setIsActionLoading(false)
		}
	}

	const handleDeleteArticle = async () => {
		setIsActionLoading(true)

		try {
			const { error } = await supabase.from('articles').delete().match({ id: id })

			if (error) {
				uiDispatch?.showToast({ type: 'ERROR', message: 'Article deletion failed.' })

				alert(error.message)
			} else {
				uiDispatch?.showToast({ type: 'SUCCESS', message: 'Successful article deletion.' })

				history.push('/')
			}
		} catch (e) {
			uiDispatch?.showToast({ type: 'ERROR', message: 'Article deletion failed.' })

			alert(e)
		} finally {
			setIsActionLoading(false)
		}
	}

	const disabled = title === ''

	return (
		<div className="article-edit-container">
			{isLoading ? <Spinner /> : null}
			{article === null ? null : (
				<>
					<div className="article-edit-header">
						<Input
							name="article-title"
							type="text"
							value={title}
							placeholder="Article title"
							className="article-edit-title"
							onChange={handleInputChange}
						/>
						<div>
							<label className="article-edit-switch">
								<input
									name="isPublish"
									type="checkbox"
									checked={isPublish}
									className="article-edit-isPublish"
									onChange={handleIsPublishChange}
								/>
								<span className="article-edit-slider" />
							</label>
							<Button
								name="article-edit-button"
								type="button"
								className="article-edit-publish-button"
								disabled={disabled || isActionLoading}
								onClick={handleUpdateArticle}
							>
								{isPublish ? 'Publish' : 'Save'}
							</Button>
							<Button
								name="article-delete-button"
								type="button"
								className="article-delete-button"
								disabled={isActionLoading}
								onClick={handleDeleteArticle}
							>
								Delete
							</Button>
						</div>
					</div>
					<div className="article-edit-inner">
						<div className="article-edit-word-inner">
							<span className="article-edit-word-txt">
								<span className="article-edit-word-emoji">🗣</span>Do you have a word?
							</span>
							<Input
								name="article-word"
								type="text"
								value={word}
								placeholder="If you have a word, please enter."
								className="article-edit-word"
								onChange={handleInputChange}
							/>
						</div>
						<div className="article-edit-categories-inner">
							<span className="article-edit-category-txt">
								<span className="article-edit-category-emoji">📚</span>Do you select categories?
							</span>
							{isSetting ? (
								<Select
									isMulti
									name="article-edit-categories"
									defaultValue={categories}
									options={appCategories}
									className="article-edit-categories-select"
									classNamePrefix="article-edit-select"
									onChange={handleChangeCategories}
								/>
							) : null}
						</div>
						<div className="article-edit-content-inner">
							{isSetting ? <NookEditor content={content} handleChangeContent={setContent} /> : null}
						</div>
					</div>
				</>
			)}
		</div>
	)
}
