import React, { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../../supabase/supabaseClient'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'

import './new.scss'

export const New = () => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [imageName, setImageName] = useState<string | null>(null)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [isUploading, setIsUploading] = useState(false)

	useEffect(() => {
		async function init() {
			if (!imageName) return

			const { data, error } = await supabase.storage.from('categories').download(imageName)

			if (error) {
				throw error.message
			}

			const url = URL.createObjectURL(data)

			setImageUrl(url)
		}

		void init()
	}, [imageName])

	const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value)
	}, [])

	const handleTextareaChange = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
		setDescription(e.currentTarget.value)
	}, [])

	const handleImageChange = useCallback(
		async (e: React.FormEvent<HTMLInputElement>) => {
			try {
				setIsUploading(true)

				if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
					throw new Error('You must select an image to upload.')
				}

				const file = e.currentTarget.files[0]
				const fileExt = file.name.split('.').pop() || ''
				const fileName = `${Date.now()}.${fileExt}`
				const filePath = `${fileName}`

				const { error: uploadError } = await supabase.storage.from('categories').upload(filePath, file)

				if (uploadError) {
					throw uploadError.message
				}

				setImageName(filePath)
			} catch (e) {
				alert(e)
			} finally {
				setIsUploading(false)
			}
		},
		[imageName]
	)

	const handleSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<>
			<h3 className="category-new-hero">Add new</h3>
			<form className="category-new-form" onSubmit={handleSubmitCategory}>
				<Input
					name="category-name"
					value={name}
					type="text"
					className="category-new-name"
					onChange={handleInputChange}
				/>
				<textarea
					name="category-description"
					value={description}
					rows={2}
					className="category-new-description"
					onChange={handleTextareaChange}
				/>
				<div className="category-new-image-container">
					<label
						className="category-new-image-label"
						htmlFor="single"
						onClick={(e) => {
							if (name === '') {
								alert('Please enter the category name.')

								e.preventDefault()

								return
							}
						}}
					>
						{isUploading ? 'Uploading ...' : 'Upload'}
					</label>
					<input
						name="category-image"
						type="file"
						id="single"
						accept="image/*"
						className="category-new-image-input"
						onChange={handleImageChange}
					/>
					{imageUrl ? <img src={imageUrl} alt="category-image" className="category-new-image-preview" /> : null}
				</div>
				<div className="category-new-button-container">
					<Button name="category-new-button" type="submit" className="category-new-button">
						Save Category
					</Button>
				</div>
			</form>
		</>
	)
}
