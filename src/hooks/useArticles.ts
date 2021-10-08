import { useCallback, useEffect, useState } from 'react'
import { PostgrestResponse } from '@supabase/supabase-js'
import { OutputData } from '@editorjs/editorjs'

import { useAuthState } from 'contexts/auth'
import { supabase } from 'supabase/supabaseClient'

export type ArticleType = {
	id: number
	slug: string
	title: string
	word: string
	ispublished: boolean
	created_at: Date
	updated_at: Date
	user_id: string
	content: OutputData | null
	categories: number[]
}

export const useFetchArticles = () => {
	const [articles, setArticles] = useState<ArticleType[] | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const state = useAuthState()

	const user = state?.user

	let didCancel = false

	const fetchArticles = useCallback(async () => {
		setIsLoading(true)

		try {
			const { data }: PostgrestResponse<ArticleType> = await supabase.from('articles').select().eq('user_id', user?.id)

			if (data && !didCancel) {
				setArticles(data)
			}
		} catch (e) {
			alert(e)
		} finally {
			setIsLoading(false)
		}
	}, [state?.loggedIn])

	useEffect(() => {
		if (!state?.loggedIn) return

		void fetchArticles()

		return () => {
			didCancel = true
		}
	}, [fetchArticles])

	return [{ articles, isLoading }]
}
