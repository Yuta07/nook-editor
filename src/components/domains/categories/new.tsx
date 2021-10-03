import React, { useCallback, useState } from 'react'

import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'

import './new.scss'

export const New = () => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value)
	}, [])

	const handleTextareaChange = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
		setDescription(e.currentTarget.value)
	}, [])

	const handleImageChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		console.log(e)
	}, [])

	const handleSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<form className="category-new-content" onSubmit={handleSubmitCategory}>
			<h3 className="category-new-hero"> Add new</h3>
			<Input name="category-name" value={name} type="text" className="category-new-name" onChange={handleInputChange} />
			<textarea
				name="category-description"
				value={description}
				className="category-new-description"
				onChange={handleTextareaChange}
			/>
			<div className="category-new-image-container">
				<label className="category-new-image-label" htmlFor="single">
					Uploading
				</label>
				<input
					name="category-image"
					type="file"
					id="single"
					accept="image/*"
					className="category-new-image-input"
					onChange={handleImageChange}
				/>
			</div>
			<div className="category-new-button-container">
				<Button name="category-new-button" type="submit" className="category-new-button">
					Save Category
				</Button>
			</div>
		</form>
	)
}
