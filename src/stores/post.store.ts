import { PostBeforeCreated } from '@/interfaces/post.interface'
import { create } from 'zustand'

interface PostStore {
    post: PostBeforeCreated
    setPost: (post: PostBeforeCreated) => void
    isPostInvalid: () => string | null
}

export const usePostStore = create<PostStore>((set, get) => ({
    post: {
        title: '',
        content: '',
        user: '',
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
        if (!post.user.trim()) {
            return 'No has ingresado correctamente, reingresa'
        }
        return null
    },
}))
