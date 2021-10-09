import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js'

import { useAuthState } from 'contexts/auth'
import { supabase } from 'supabase/supabaseClient'
import { ArticleType } from 'types'

export const useFetchArticles = () => {
	const [articles, setArticles] = useState<ArticleType[] | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const state = useAuthState()

	const user = state?.user

	let didCancel = false

	const fetchArticles = useCallback(async () => {
		setIsLoading(true)

		try {
			const { data }: PostgrestResponse<ArticleType> = await supabase
				.from('articles')
				.select()
				.eq('user_id', user?.id)
				.order('created_at', { ascending: false })

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

export const useFetchArticle = () => {
	const [article, setArticle] = useState<ArticleType | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const state = useAuthState()

	const user = state?.user

	const params = useParams<{ article_slug: string }>()
	const { article_slug } = params

	let didCancel = false

	const fetchArticle = useCallback(async () => {
		setIsLoading(true)

		try {
			const result: PostgrestSingleResponse<ArticleType> = await supabase
				.from('articles')
				.select()
				.match({ user_id: user?.id, slug: article_slug })
				.single()

			const { error, data } = result

			if (error) {
				alert(error.message)
			}

			if (data && !didCancel) {
				setArticle(data)
			}
		} catch (e) {
			alert(e)
		} finally {
			setIsLoading(false)
		}
	}, [state?.loggedIn, article_slug])

	useEffect(() => {
		if (!state?.loggedIn) return

		void fetchArticle()

		return () => {
			didCancel = true
		}
	}, [fetchArticle])

	return [{ article, isLoading }]
}
