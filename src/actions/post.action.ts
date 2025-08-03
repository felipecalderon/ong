'use server'
import { getAllPosts, createPost, getPostById } from '@/services/post.service'
import { NewPost } from '@/interfaces/post.interface'
import { revalidatePath } from 'next/cache'

export async function savePost(post: NewPost) {
    const savedPost = await createPost(post)
    revalidatePath('/perfil') // Revalida el dashboard por si el usuario crea un post
    return savedPost
}

export async function getPosts({ postType, userId }: { postType?: 'noticia' | 'denuncia' | 'recomendacion'; userId?: string }) {
    return await getAllPosts({ postType, userId })
}

export async function getPost(id: string) {
    return await getPostById(id)
}

// export async function deletePost(postId: string) {
//     try {
//         await postService.delete(postId)
//         revalidatePath('/perfil') // Revalida para que el post eliminado desaparezca
//         return { success: true, message: 'Publicación eliminada con éxito.' }
//     } catch (error) {
//         return { success: false, message: 'No se pudo eliminar la publicación.' }
//     }
// }
