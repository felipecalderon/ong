import { NewPost } from '@/interfaces/post.interface'
import { create } from 'zustand'

interface PostStore {
    post: NewPost
    setPost: (post: NewPost) => void
    isPostInvalid: () => string | null
}

export const usePostStore = create<PostStore>((set, get) => ({
    post: {
        title: '',
        content: '',
        user: '',
        categories: [],
        postType: 'denuncia',
        evidence: [],
        location: 'algun lugar..',
        status: 'pendiente',
    },
    setPost: (post) => set({ post }),
    isPostInvalid: () => {
        const { post } = get()
        if (!post.title.trim()) {
            return 'Debes ingresar un motivo de la denuncia'
        }
        if (!post.content.trim()) {
            return 'Redacta tu denuncia con detalle'
        }
        return null
    },
}))
