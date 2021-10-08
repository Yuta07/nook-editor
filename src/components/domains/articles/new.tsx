import React, { useCallback, useState } from 'react'
import Select from 'react-select'
import { OutputData } from '@editorjs/editorjs'

import { NookEditor } from 'components/editor'
import { Button } from 'components/ui/Button'
import { Input } from 'components/ui/Input'
import { useAuthState } from 'contexts/auth'
import { supabase } from 'supabase/supabaseClient'

import './new.scss'

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
]

export const ArticleNew = () => {
	const [title, setTitle] = useState('')
	const [word, setWord] = useState('')
	const [content, setContent] = useState<OutputData | undefined>(undefined)
	const [isPublish, setIsPublish] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const user = useAuthState()?.user

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

	const handleIsPublishChange = useCallback(() => {
		setIsPublish((prev) => !prev)
	}, [])

	const handleSubmitArticle = async () => {
		setIsLoading(true)

		try {
			const { data, error } = await supabase
				.from('articles')
				.insert([{ title, word, content, ispublished: isPublish, user_id: user?.id, categories: [8] }])

			console.log(data, error)
			if (error) {
				alert(error)
			} else {
				console.log(data)
			}
		} catch (e) {
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
					<Select isMulti name="article-new-categories" options={options} className="article-new-categories-select" />
				</div>
				<div className="article-new-content-inner">
					<NookEditor content={content} handleChangeContent={setContent} />
				</div>
			</div>
		</div>
	)
}
