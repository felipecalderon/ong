'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from '@/components/md-editor/toolbar'
import { useSession } from 'next-auth/react'
import { usePostStore } from '@/stores/post.store'
import { useEffect } from 'react'
import { Input } from '../ui/input'

export default function Editor() {
    const { data: session } = useSession()
    const { setPost, post, savePost, loading } = usePostStore()

    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Escribe aquí tu publicación...</p>',
        onUpdate: (props) => {
            const html = props.editor.getHTML()
            setPost({
                ...post,
                content: html,
            })
        },
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
    })

    useEffect(() => {
        if (session) {
            setPost({
                ...post,
                user: session.user?.email || '',
            })
        }
    }, [session])
    if (!session) return null
    return (
        <div className='max-w-lg shadow-2xl p-4'>
            <div className='flex items-center gap-2'>
                <Input
                    type='text'
                    id='title'
                    placeholder='Agregar un título'
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    className='mt-2'
                />
            </div>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
            <button className='bkn' onClick={() => savePost()}>
                <span aria-hidden='true'>Guardar</span>
                <span></span>
                {loading ? <span>Guardando...</span> : <span>Guardar</span>}
            </button>
        </div>
    )
}
