'use server'
import { getAllPosts, createPost, getPostById, deletePost as deletePostService } from '@/services/post.service'
import { NewPost } from '@/interfaces/post.interface'
import { revalidatePath } from 'next/cache'

export async function savePost(post: NewPost) {
    try {
        const savedPost = await createPost(post)
        revalidatePath('/perfil') // Revalida el dashboard por si el usuario crea un post
        return { success: true, data: savedPost }
    } catch (error) {
        return { success: false, message: 'No se pudo guardar la publicación.' }
    }
}

export async function getPosts({ postType, userId }: { postType?: 'noticia' | 'denuncia' | 'recomendacion'; userId?: string }) {
    try {
        const posts = await getAllPosts({ postType, userId })
        return { success: true, data: posts }
    } catch (error) {
        return { success: false, message: 'No se pudieron obtener las publicaciones.' }
    }
}

export async function getPost(id: string) {
    try {
        const post = await getPostById(id)
        return { success: true, data: post }
    } catch (error) {
        return { success: false, message: 'No se pudo obtener la publicación.' }
    }
}

export async function deletePost(postId: string) {
    try {
        await deletePostService(postId)
        revalidatePath('/perfil') // Revalida para que el post eliminado desaparezca
        return { success: true, message: 'Publicación eliminada con éxito.' }
    } catch (error) {
        return { success: false, message: 'No se pudo eliminar la publicación.' }
    }
}