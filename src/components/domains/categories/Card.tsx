import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegTrashAlt } from 'react-icons/fa'

import { CategoryState, useCategoriesDispatch } from '../../../contexts/categories'
import { supabase } from '../../../supabase/supabaseClient'

import './card.scss'

type Props = {
	category: CategoryState
}

export const Card = ({ category }: Props) => {
	const [imageUrl, setImageUrl] = useState<string>('')

	const dispatch = useCategoriesDispatch()

	useEffect(() => {
		async function downloadImage() {
			try {
				const { data, error } = await supabase.storage.from('categories').download(category.image_url)

				if (error) {
					throw error
				}

				const url = URL.createObjectURL(data)

				setImageUrl(url)
			} catch (error) {
				alert(`Error downloading image:, category_${category.name}.`)
			}
		}

		if (category.image_url === null) return

		void downloadImage()
	}, [])

	const handleClickCategoryDelete = useCallback(async () => {
		if (window.confirm(`Are you sure you want to delete category: ${category.name}?`)) {
			if (category.image_url) {
				await supabase.storage.from('categories').remove([category.image_url])
			}

			const { error } = await supabase.from('categories').delete().match({ id: category.id })

			if (error) {
				throw error
			} else {
				dispatch?.deleteCategory(category.id)
			}
		}
	}, [])

	return (
		<div className="category-cart-outer-container">
			<Link to={`/categories/${category.name}`} className="category-card-container">
				<img
					src={imageUrl || '/category_default.png'}
					alt={`category_${category.name}`}
					className="category-card-image"
				/>
				<h3 className="category-card-name">{category.name}</h3>
			</Link>
			<button
				name="category-delete-button"
				type="button"
				className="category-card-action-button"
				onClick={handleClickCategoryDelete}
			>
				<FaRegTrashAlt size={18} color="var(--color-gray-darken)" />
			</button>
		</div>
	)
}
