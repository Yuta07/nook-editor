import { useCallback, useEffect } from 'react'
import { PostgrestResponse } from '@supabase/supabase-js'

import { useAuthState } from '../contexts/auth'
import { CategoryState, useCategoriesDispatch } from '../contexts/categories'
import { supabase } from '../supabase/supabaseClient'

export const useFetchCategories = () => {
	const state = useAuthState()
	const dispatch = useCategoriesDispatch()

	const user = state?.user

	let didCancel = false

	const fetchCategories = useCallback(async () => {
		try {
			const { data }: PostgrestResponse<CategoryState> = await supabase
				.from('categories')
				.select()
				.eq('user_id', user?.id)

			if (data && !didCancel) {
				dispatch?.fetchCategories(data)
			}
		} catch (e) {
			alert(e)
		}
	}, [state?.loggedIn])

	useEffect(() => {
		if (!state?.loggedIn) return

		void fetchCategories()

		return () => {
			didCancel = true
		}
	}, [fetchCategories])
}
