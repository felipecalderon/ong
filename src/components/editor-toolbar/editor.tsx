'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ToolBar } from '@/components/editor-toolbar/toolbar'
import { usePostStore } from '@/stores/post.store'
import { Input } from '../ui/input'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { toast } from 'sonner'
import { useEffect, useTransition } from 'react'
import { savePost } from '@/actions/post.action'
import { useSession } from 'next-auth/react'

export default function Editor({ html }: { html?: string }) {
    const extensions = [TextStyleKit, StarterKit]
    const { setPost, post, isPostInvalid } = usePostStore()
    const [isLoading, startTransition] = useTransition()
    const { data } = useSession()

    const editor = useEditor({
        extensions: extensions,
        onUpdate: (props) => {
            const postHtml = html ?? props.editor.getHTML()
            setPost({
                ...post,
                content: postHtml,
            })
        },
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
    })

    const submitPost = async () => {
        const error = isPostInvalid()
        if (error) {
            return toast.error(error, { position: 'bottom-center' })
        }
        startTransition(async () => {
            const postCreated = await savePost(post)
            console.log(postCreated)
            if (postCreated) {
                toast.success('Denuncia enviada exitosamente!', { position: 'top-center', duration: 5000, closeButton: true })
                setPost({ ...post, content: '', title: '' })
                editor?.commands.clearContent()
            }
        })
    }

    useEffect(() => {
        if (data?.user) {
            setPost({ ...post, user: data.user.id })
        }
    }, [data])
    if (!editor) return null
    return (
        <div className='w-full flex flex-col h-[500px]'>
            <Input
                type='text'
                placeholder='Motivo de la Denuncia'
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className='my-2 bg-sky-100'
            />
            <ToolBar editor={editor} />
            <p className='italic text-slate-500 cursor-default text-sm'>Redacta aquí debajo tu denuncia:</p>
            <div className='flex-1 overflow-y-auto border rounded-md p-2'>
                <EditorContent editor={editor} className='prose prose-slate min-h-[200px]' />
            </div>
            <button className='bkn' onClick={submitPost}>
                <span aria-hidden='true'>Enviar</span>
                <span></span>
                {isLoading ? <span>Enviando...</span> : <span>Enviar</span>}
            </button>
        </div>
    )
}
