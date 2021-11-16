import { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js'

import { useAuthState } from '../contexts/auth'
import { useUIDispatch } from '../contexts/ui'
import { supabase } from '../supabase/supabaseClient'
import { ArticleType } from '../types'

export const useFetchArticles = () => {
	const [articles, setArticles] = useState<ArticleType[] | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const state = useAuthState()
	const uiDispatch = useUIDispatch()

	const user = state?.user

	let didCancel = false

	const search = useLocation().search

	const fetchArticles = useCallback(
		async (searchTxt: string, categoryId: number | null) => {
			setIsLoading(true)

			try {
				const { data }: PostgrestResponse<ArticleType> = await supabase
					.from('articles')
					.select()
					.eq('user_id', user?.id)
					.like('title', `%${searchTxt}%`)
					.contains('categories', [categoryId])
					.order('created_at', { ascending: false })

				if (data && !didCancel) {
					setArticles(data)
				}
			} catch (e) {
				uiDispatch?.showToast({ type: 'ERROR', message: 'Failed to fetch the articles.' })

				alert(e)
			} finally {
				setIsLoading(false)
			}
		},
		[state?.loggedIn]
	)

	useEffect(() => {
		if (!state?.loggedIn) return

		const query = new URLSearchParams(search)
		const title = query.get('q') || ''

		void fetchArticles(title, null)

		return () => {
			didCancel = true
		}
	}, [fetchArticles])

	return [{ articles, isLoading, fetchArticles }]
}

export const useFetchArticle = () => {
	const [article, setArticle] = useState<ArticleType | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const state = useAuthState()
	const uiDispatch = useUIDispatch()

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
			uiDispatch?.showToast({ type: 'ERROR', message: 'Failed to fetch the specified article.' })

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
