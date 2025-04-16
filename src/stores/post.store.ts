import { Post } from '@/interfaces/post.interface'
import { create } from 'zustand'

interface PostStore {
    post: Post
    loading: boolean
    setPost: (post: Post) => void
    savePost: () => Promise<void>
}

export const usePostStore = create<PostStore>((set, get) => ({
    post: {
        title: '',
        content: '',
        user: '',
    },
    loading: false,
    setPost: (post: Post) => set({ post }),
    savePost: async () => {
        try {
            set({ loading: true })
            const { post } = get()
            await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
            console.log('Contenido guardado:', post)
        } catch (error) {
            console.error('Error al guardar post:', error)
        } finally {
            set({ loading: false })
        }
    },
}))
