'use server'
import { postService } from '@/services/post.service'
import { NewPost } from '@/interfaces/post.interface'

export async function savePost(post: NewPost) {
    return await postService.create(post)
}

export async function getPosts({ postType, userId }: { postType?: 'noticia' | 'denuncia' | 'recomendacion', userId?: string }) {
    return await postService.getAll({ postType, userId })
}

export async function getPost(id: string) {
    return await postService.getById(id)
}
