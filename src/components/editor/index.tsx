
import Checklist from '@editorjs/checklist'
import CodeTool from '@editorjs/code'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Quote from '@editorjs/quote'
import Warning from '@editorjs/warning'
import { memo, useCallback, useEffect } from 'react'

import { supabase } from '../../supabase/supabaseClient'

import './editor.scss'

type Props = {
	content: OutputData | undefined
	handleChangeContent: (data: OutputData) => void
}

let nookEditor: EditorJS

export const NookEditor = memo(({ content, handleChangeContent }: Props) => {
	useEffect(() => {
		nookEditor = new EditorJS({
			holder: 'editorjs',
			placeholder: 'Let`s write an awesome article!',
			tools: {
				header: {
					class: Header, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
					config: {
						levels: [2, 3, 4, 5],
						defaultLevel: 2,
					},
				},
				list: {
					class: List, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
					inlineToolbar: true,
				},
				checklist: {
					class: Checklist, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
					inlineToolbar: true,
				},
				quote: {
					class: Quote, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
					inlineToolbar: true,
					config: {
						quotePlaceholder: 'Enter a quote',
						captionPlaceholder: "Quote's author",
					},
				},
				Marker: {
					class: Marker, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
				},
				inlineCode: {
					class: InlineCode, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
				},
				code: CodeTool, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
				warning: {
					class: Warning, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
					inlineToolbar: true,
				},
				embed: {
					class: Embed, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
					config: {
						services: {
							youtube: true,
							coub: true,
						},
					},
					inlineToolbar: true,
				},
				image: {
					class: ImageTool, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
					config: {
						uploader: {
							async uploadByFile(file: File) {
								return upload(file).then((data) => {
									return {
										success: 1,
										file: {
											url: data,
										},
									}
								})
							},
						},
					},
				},
			},
			onChange: () => {
				void save()
			},
			data: content,
		})

		return () => {
			nookEditor.isReady
				.then(() => {
					nookEditor.destroy()
				})
				.catch((e) => console.error('ERROR editor cleanup', e))
		}
	}, [])

	const save = async () => {
		const savedData: OutputData = await nookEditor.saver.save() // eslint-disable-line @typescript-eslint/no-unsafe-assignment

		handleChangeContent(savedData)
	}

	const upload = useCallback(async (file: File) => {
		if (!file) {
			throw new Error('You must select an image to upload.')
		}

		const fileExt = file.name.split('.').pop() || ''
		const fileName = `${Date.now()}.${fileExt}`
		const filePath = `${fileName}`

		const { error: uploadError } = await supabase.storage.from('articles').upload(filePath, file)

		if (uploadError) {
			throw uploadError.message
		}

		const { data, error } = await supabase.storage.from('articles').download(filePath)
		const url = URL.createObjectURL(data)

		if (error) {
			throw error.message
		}

		return url
	}, [])

	return <div className="editor-main" id="editorjs" />
})
