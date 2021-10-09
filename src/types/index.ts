import { OutputData } from '@editorjs/editorjs'

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
