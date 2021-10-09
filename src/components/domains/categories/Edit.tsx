import { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FaCamera } from 'react-icons/fa'

import { useAuthState } from '../../../contexts/auth'
import { CategoryState, useCategoriesDispatch, useCategoriesState } from '../../../contexts/categories'
import { supabase } from '../../../supabase/supabaseClient'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'

import './edit.scss'

export const Edit = () => {
	const [id, setId] = useState(0)
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [imageName, setImageName] = useState<string | null>(null)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isUploading, setIsUploading] = useState(false)

	const user = useAuthState()?.user
	const dispatch = useCategoriesDispatch()
	const state = useCategoriesState()

	const param = useParams()
	const history = useHistory()

	useEffect(() => {
		if (state.categories) {
			const result = state.categories.some((category: CategoryState) => {
				return category.name === param['name']
			})

			if (result) {
				const category = state.categories.find((category) => {
					return category.name === param['name']
				})

				if (category) {
					setId(category.id)
					setName(category.name)
					setDescription(category.description || '')
					setImageName(category.image_url)
				}
			}
		}
	}, [state.categories])

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

	const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsLoading(true)

		try {
			const { data, error } = await supabase
				.from('categories')
				.update({ name, description, image_url: imageName })
				.match({ user_id: user?.id, id: id })

			if (error) {
				alert(error)
			} else {
				const category = data as CategoryState[]

				history.push({ pathname: `/categories/${category[0].name}` })

				dispatch?.updateCategory(category[0])
			}
		} catch (e) {
			alert(e)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="categories-edit-container">
			<h2 className="categories-edit-hero">Category Edit</h2>
			<div className="category-edit-inner">
				<form className="category-edit-form" onSubmit={handleSubmitCategory}>
					<Input
						name="category-name"
						value={name}
						type="text"
						placeholder="category name"
						className="category-edit-name"
						onChange={handleInputChange}
					/>
					<textarea
						name="category-description"
						value={description}
						rows={2}
						placeholder="category description"
						className="category-edit-description"
						onChange={handleTextareaChange}
					/>
					<div className="category-edit-image-container">
						<img
							src={imageUrl || '/category_default.png'}
							alt="category-image"
							className="category-edit-image-preview"
						/>
						<label
							className="category-edit-image-label"
							htmlFor="single"
							onClick={(e) => {
								if (name === '') {
									alert('Please enter the category name.')

									e.preventDefault()

									return
								}
							}}
						>
							<FaCamera size={24} color="var(--color-gray-darken)" />
						</label>
						<input
							name="category-image"
							type="file"
							id="single"
							accept="image/*"
							className="category-edit-image-input"
							onChange={handleImageChange}
						/>
					</div>
					<div className="category-edit-button-container">
						<Button
							name="category-edit-button"
							type="submit"
							className="category-edit-button"
							disabled={name === '' || isLoading || isUploading}
						>
							Save Category
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
