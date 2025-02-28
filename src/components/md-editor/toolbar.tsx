'use client'
import { type Editor } from '@tiptap/react'

import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo, Code } from 'lucide-react'

// Componente para la barra de herramientas
export default function Toolbar({ editor }: { editor: Editor | null }) {
    if (!editor) {
        return null
    }

    return (
        <div className='toolbar'>
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''} title='Negrita'>
                <Bold size={18} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
                title='Cursiva'>
                <Italic size={18} />
            </button>

            <div className='divider'></div>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                title='Encabezado 1'>
                <Heading1 size={18} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                title='Encabezado 2'>
                <Heading2 size={18} />
            </button>

            <div className='divider'></div>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                title='Lista con viñetas'>
                <List size={18} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
                title='Lista numerada'>
                <ListOrdered size={18} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
                title='Cita'>
                <Quote size={18} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
                title='Bloque de código'>
                <Code size={18} />
            </button>

            <div className='divider'></div>

            <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title='Deshacer'>
                <Undo size={18} />
            </button>

            <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title='Rehacer'>
                <Redo size={18} />
            </button>
        </div>
    )
}
