import EditorJS from '@editorjs/editorjs'

import './editor.scss'

export const NookEditor = () => {
	new EditorJS({
		holder: 'editorjs',
	})

	return <div className="editor-main" id="editorjs" />
}
