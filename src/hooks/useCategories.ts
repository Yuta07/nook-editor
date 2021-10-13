import { useCallback, useEffect } from 'react'
import { PostgrestResponse } from '@supabase/supabase-js'

import { useAuthState } from 'contexts/auth'
import { CategoryState, useCategoriesDispatch } from 'contexts/categories'
import { useUIDispatch } from 'contexts/ui'
import { supabase } from 'supabase/supabaseClient'

export const useFetchCategories = () => {
	const state = useAuthState()
	const categoriesDispatch = useCategoriesDispatch()
	const uiDispatch = useUIDispatch()

	const user = state?.user

	let didCancel = false

	const fetchCategories = useCallback(async () => {
		try {
			const { data }: PostgrestResponse<CategoryState> = await supabase
				.from('categories')
				.select()
				.eq('user_id', user?.id)

			if (data && !didCancel) {
				categoriesDispatch?.fetchCategories(data)
			}
		} catch (e) {
			uiDispatch?.showToast({ type: 'ERROR', message: 'Failed to fetch the category list.' })

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
