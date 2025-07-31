import { NewPost } from '@/interfaces/post.interface'
import { create } from 'zustand'

interface PostStore {
    post: NewPost
    setPost: (post: NewPost) => void
    isPostInvalid: () => string | null
    resetPost: (userId: string) => void
}

const initialPostState: NewPost = {
    title: '',
    content: '',
    user: '',
    categories: [],
    postType: 'denuncia',
    evidence: [],
    location: '',
    status: 'pendiente',
}

export const usePostStore = create<PostStore>((set, get) => ({
    post: initialPostState,
    setPost: (post) => set({ post }),
    resetPost: (userId) => {
        set({ post: { ...initialPostState, user: userId } })
    },
    isPostInvalid: () => {
        const { post } = get()
        if (!post.title.trim()) {
            return `Debes ingresar un ${post.postType === 'denuncia' ? 'motivo' : 'título'}.`
        }
        if (!post.content.trim()) {
            return `Debes redactar el contenido.`
        }
        if (post.postType === 'denuncia' && !post.location?.trim()) {
            return 'Debes especificar la ubicación de los hechos.'
        }
        return null
    },
}))
