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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { PostType, NewPost, GeneralPost, ComplaintPost, newGeneralPost, newComplainPost } from '@/interfaces/post.interface'

export default function Editor({ html }: { html?: string }) {
    const extensions = [TextStyleKit, StarterKit]
    const { setPost, post, isPostInvalid, resetPost } = usePostStore()
    const [isLoading, startTransition] = useTransition()
    const { data } = useSession()

    const editor = useEditor({
        extensions: extensions,
        onUpdate: (props) => {
            const postHtml = html ?? props.editor.getHTML()
            setPost({ ...post, content: postHtml })
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
            if (postCreated) {
                toast.success(`¡${post.postType.charAt(0).toUpperCase() + post.postType.slice(1)} enviada exitosamente!`, {
                    position: 'top-center',
                    duration: 5000,
                    closeButton: true,
                })
                if (data?.user?.id) {
                    resetPost(data.user.id)
                }
                editor?.commands.clearContent()
            }
        })
    }

    useEffect(() => {
        if (data?.user) {
            const newPost = { ...post, user: data.user.id, postType: 'denuncia' } as newComplainPost
            setPost(newPost)
        }
    }, [data])

    if (!editor) return null

    const handlePostTypeChange = (value: PostType) => {
        const commonData = { ...post, postType: value }

        let newPost: NewPost

        if (value === 'denuncia') {
            newPost = {
                ...commonData,
                postType: 'denuncia',
                status: 'pendiente',
                location: '',
                evidence: [],
            } as newComplainPost
        } else {
            const { status, location, evidence, ...remaningPost } = post as newComplainPost
            newPost = {
                ...remaningPost,
                postType: value as 'noticia' | 'recomendacion',
            } as newGeneralPost
        }

        setPost(newPost)
    }

    const getPlaceholder = () => {
        switch (post.postType) {
            case 'denuncia':
                return 'Motivo de la Denuncia'
            case 'noticia':
                return 'Titular de la Noticia'
            case 'recomendacion':
                return 'Título de la Recomendación'
            default:
                return 'Título'
        }
    }

    const getDescription = () => {
        switch (post.postType) {
            case 'denuncia':
                return 'Redacta aquí debajo tu denuncia:'
            case 'noticia':
                return 'Escribe aquí el cuerpo de la noticia:'
            case 'recomendacion':
                return 'Detalla aquí tu recomendación:'
            default:
                return 'Escribe aquí el contenido:'
        }
    }

    return (
        <div className='w-full flex flex-col h-[70vh] max-h-[650px]'>
            <div className='my-4'>
                <RadioGroup defaultValue='denuncia' className='flex gap-4' onValueChange={(value: PostType) => handlePostTypeChange(value)}>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='denuncia' id='denuncia' />
                        <Label htmlFor='denuncia'>Denuncia</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='noticia' id='noticia' />
                        <Label htmlFor='noticia'>Noticia</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='recomendacion' id='recomendacion' />
                        <Label htmlFor='recomendacion'>Recomendación</Label>
                    </div>
                </RadioGroup>
            </div>
            <Input
                type='text'
                placeholder={getPlaceholder()}
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className='my-2 bg-sky-100'
            />
            {post.postType === 'denuncia' && (
                <Input
                    type='text'
                    placeholder='Ubicación de los hechos'
                    value={(post as ComplaintPost).location || ''}
                    onChange={(e) => setPost({ ...post, location: e.target.value })}
                    className='my-2 bg-sky-100'
                />
            )}
            <ToolBar editor={editor} />
            <p className='italic text-slate-500 cursor-default text-sm'>{getDescription()}</p>
            <div className='flex-1 overflow-y-auto border rounded-md p-2 min-h-0'>
                <EditorContent editor={editor} className='prose prose-slate min-h-full h-full' />
            </div>
            <button className='bkn mt-4' onClick={submitPost}>
                <span aria-hidden='true'>Enviar</span>
                <span></span>
                {isLoading ? <span>Enviando...</span> : <span>Enviar</span>}
            </button>
        </div>
    )
}
