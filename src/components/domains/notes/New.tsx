import React, { useCallback, useEffect, useState } from 'react'
import Select, { MultiValue, ActionMeta } from 'react-select'

import { useAuthState } from '../../../contexts/auth'
import { useCategoriesState } from '../../../contexts/categories'
import { useUIDispatch } from '../../../contexts/ui'
import { supabase } from '../../../supabase/supabaseClient'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'

import type { NoteType } from '.././../../types'

import './new.scss'

export const New = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [categories, setCategories] = useState<{ label: string; value: number }[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const [appCategories, setAppCategories] = useState<{ label: string; value: number }[]>([])

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

	const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}, [])

	const handleTextareaChange = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
		setDescription(e.currentTarget.value)
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

	const handleSubmitnote = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsLoading(true)

		try {
			const selectedCategories = categories.map((category) => {
				return category.value
			})

			const { data, error } = await supabase
				.from('notes')
				.insert([{ title, description, user_id: user?.id, categories: selectedCategories }])

			if (error) {
				alert(error)
			} else {
				const note = data as NoteType[]

				uiDispatch?.showToast({ type: 'SUCCESS', message: 'Successful note creation.' })

				console.log(note)

				setTitle('')
				setDescription('')
			}
		} catch (e) {
			uiDispatch?.showToast({ type: 'ERROR', message: 'note creation failed.' })

			alert(e)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<h3 className="note-new-hero">Add new</h3>
			<form className="note-new-form" onSubmit={handleSubmitnote}>
				<Input
					name="title-name"
					value={title}
					type="text"
					placeholder="note name"
					className="note-new-name"
					onChange={handleInputChange}
				/>
				<textarea
					name="note-description"
					value={description}
					rows={2}
					placeholder="note description"
					className="note-new-description"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					onChange={handleTextareaChange}
				/>
				<div className="note-new-categories-inner">
					<span className="note-new-category-txt">
						<span className="note-new-category-emoji">📚</span>Do you select categories?
					</span>
					<Select
						isMulti
						name="note-new-categories"
						options={appCategories}
						className="note-new-categories-select"
						classNamePrefix="note-new-select"
						menuPortalTarget={document.body}
						styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
						onChange={handleChangeCategories}
					/>
				</div>
				<div className="note-new-button-container">
					<Button name="note-new-button" type="submit" className="note-new-button" disabled={title === '' || isLoading}>
						Save note
					</Button>
				</div>
			</form>
		</>
	)
}
