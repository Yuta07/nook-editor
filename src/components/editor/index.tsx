import { useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'

import Checklist from '@editorjs/checklist'
import CodeTool from '@editorjs/code'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import Marker from '@editorjs/marker'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Warning from '@editorjs/warning'

import './editor.scss'

export const NookEditor = () => {
	useEffect(() => {
		new EditorJS({
			holder: 'editorjs',
			placeholder: 'Let`s write an awesome article!',
			tools: {
				header: Header, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
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
						endpoints: {},
					},
				},
			},
		})
	}, [])

	return <div className="editor-main" id="editorjs" />
}
