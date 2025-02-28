'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from '@/components/md-editor/toolbar'
import { useSession } from 'next-auth/react'

export default function Editor() {
    const { data: session } = useSession()

    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Escribe aquí tu publicación...</p>',
    })

    const saveContent = async () => {
        if (editor) {
            const text = editor.getHTML()
            const id = new Date().getTime().toString()

            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, text }),
            })

            console.log('Contenido guardado:', text)
        }
    }

    if (!session) return null
    return (
        <div className='max-w-lg shadow-2xl p-4'>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
            <button className='bkn' onClick={saveContent}>
                <span aria-hidden='true'>Guardar</span>
                <span></span>
                <span>Guardar</span>
            </button>
        </div>
    )
}
