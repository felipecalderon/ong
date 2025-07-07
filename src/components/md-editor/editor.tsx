'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from '@/components/md-editor/toolbar'
import { usePostStore } from '@/stores/post.store'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'

export default function Editor() {
    const { setPost, post, savePost, loading } = usePostStore()
    // const [isClicked, setClicked] = useState(false)

    // const changeClicked = () => {
    //     setClicked(() => !isClicked)
    //     console.log(isClicked)
    // }

    const editor = useEditor({
        extensions: [StarterKit],
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

    return (
        <div className='max-w-lg shadow-2xl p-4'>
            <div className='flex items-center gap-2'>
                <Input
                    type='text'
                    id='title'
                    placeholder='Motivo de la Denuncia'
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    className='my-2'
                />
            </div>
            <Toolbar editor={editor} />
            <p className='italic text-slate-500 cursor-default text-sm'>
                Redacta aquí debajo tu denuncia con la mayor cantidad de detalles posibles:
            </p>
            <EditorContent editor={editor} onClick={() => console.log(true)} placeholder='asdasdas' />
            <button className='bkn' onClick={() => savePost()}>
                <span aria-hidden='true'>Enviar</span>
                <span></span>
                {loading ? <span>Enviando...</span> : <span>Enviar</span>}
            </button>
        </div>
    )
}
