'use client'
// import { useEditorState, type Editor } from '@tiptap/react'
// import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo, Code } from 'lucide-react'
import './editorbar.css'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import { FaBold, FaItalic, FaRemoveFormat, FaStrikethrough } from 'react-icons/fa'
import { FaList, FaListOl, FaCode } from 'react-icons/fa6'
import { IoArrowRedoSharp, IoArrowUndoCircleSharp, IoArrowUndoSharp } from 'react-icons/io5'

import React from 'react'

export const ToolBar = ({ editor }: { editor: Editor }) => {
    // Read the current editor's state, and re-render the component when it changes
    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                isBold: ctx.editor.isActive('bold'),
                canBold: ctx.editor.can().chain().focus().toggleBold().run(),
                isItalic: ctx.editor.isActive('italic'),
                canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
                isStrike: ctx.editor.isActive('strike'),
                canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
                isCode: ctx.editor.isActive('code'),
                canCode: ctx.editor.can().chain().focus().toggleCode().run(),
                canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
                isParagraph: ctx.editor.isActive('paragraph'),
                isHeading1: ctx.editor.isActive('heading', { level: 1 }),
                isHeading2: ctx.editor.isActive('heading', { level: 2 }),
                isHeading3: ctx.editor.isActive('heading', { level: 3 }),
                isHeading4: ctx.editor.isActive('heading', { level: 4 }),
                isHeading5: ctx.editor.isActive('heading', { level: 5 }),
                isHeading6: ctx.editor.isActive('heading', { level: 6 }),
                isBulletList: ctx.editor.isActive('bulletList'),
                isOrderedList: ctx.editor.isActive('orderedList'),
                isCodeBlock: ctx.editor.isActive('codeBlock'),
                isBlockquote: ctx.editor.isActive('blockquote'),
                canUndo: ctx.editor.can().chain().focus().undo().run(),
                canRedo: ctx.editor.can().chain().focus().redo().run(),
            }
        },
    })

    return (
        <div className='control-group'>
            <div className='toolbar'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={editorState.isBold ? 'is-active' : ''}
                    title='Negrita'>
                    <FaBold className='text-xl' />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={editorState.isItalic ? 'is-active' : ''}>
                    <FaItalic className='text-xl' />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={editorState.isStrike ? 'is-active' : ''}>
                    <FaStrikethrough className='text-xl' />
                </button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()} title='Borrar formato'>
                    <FaRemoveFormat className='text-xl' />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editorState.isHeading1 ? 'is-active' : ''}
                    title='Título'>
                    <span className='font-bold text-2xl'>T</span>
                </button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editorState.isBulletList ? 'is-active' : ''}>
                    <FaList className='text-xl' />
                </button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editorState.isOrderedList ? 'is-active' : ''}>
                    <FaListOl className='text-xl' />
                </button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editorState.isCodeBlock ? 'is-active' : ''}>
                    <FaCode className='text-xl' />
                </button>
                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo} title='Deshacer'>
                    <IoArrowUndoSharp className='text-xl' />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo} title='Rehacer'>
                    <IoArrowRedoSharp className='text-xl' />
                </button>
            </div>
        </div>
    )
}
