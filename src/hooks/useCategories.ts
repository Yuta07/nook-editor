import { useEffect } from 'react'
import { PostgrestResponse } from '@supabase/supabase-js'

import { useAuthState } from '../contexts/auth'
import { CategoryState, useCategoriesDispatch } from '../contexts/categories'
import { supabase } from '../supabase/supabaseClient'

export const useFetchCategories = () => {
	const abortController = new AbortController()

	const state = useAuthState()
	const dispatch = useCategoriesDispatch()

	const fetchCategories = async () => {
		try {
			const { data }: PostgrestResponse<CategoryState> = await supabase.from('categories').select()

			if (data) {
				dispatch?.fetchCategories(data)
			}
		} catch (e) {
			alert(e)
		}
	}

	useEffect(() => {
		if (!state?.loggedIn) return

		void fetchCategories()

		const cleanup = () => {
			abortController?.abort()
		}

		return cleanup
	}, [state])
}

export const useCreateCategory = () => {}

export const useUpdateCatogory = () => {}

export const useDeleteCategory = () => {}
