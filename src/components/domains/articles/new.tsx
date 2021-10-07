import React, { useCallback, useState } from 'react'

import { NookEditor } from '../../editor'
import { Input } from '../../ui/Input'
import './new.scss'

export const ArticleNew = () => {
	const [title, setTitle] = useState('')
	const [word, setWord] = useState('')
	// const [content, setContent] = useState(null)
	const [isPublish, setIsPublish] = useState(false)

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
					<span className="article-new-isPublish-txt">{isPublish ? 'Publish' : 'Draft'}</span>
				</div>
			</div>
			<div className="article-new-inner">
				<div className="article-new-word-inner">
					<span className="article-new-word-txt">
						<span className="article-new-word-emoji">🗣</span> Do you have a word?
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
				<div className="article-new-content-inner">
					<NookEditor />
				</div>
			</div>
		</div>
	)
}
