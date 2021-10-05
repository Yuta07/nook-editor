import { useEffect, useState } from 'react'

import { CategoryState } from '../../../contexts/categories'
import { supabase } from '../../../supabase/supabaseClient'

import './card.scss'

type Props = {
	category: CategoryState
}

export const Card = ({ category }: Props) => {
	const [imageUrl, setImageUrl] = useState<string>('')

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

		void downloadImage()
	}, [])

	return (
		<a className="category-card-container">
			<img src={imageUrl} alt={`category_${category.name}`} className="category-card-image" />
			<h3 className="category-card-name">{category.name}</h3>
		</a>
	)
}
