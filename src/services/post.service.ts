import { PostModel } from '@/database/models/post.model'
import { connectToMongoDB } from '@/database/mongo'
import { Post } from '@/interfaces/post.interface'

/**
 * Crea un nuevo post en la base de datos.
 * @param post - El objeto del post a guardar.
 * @returns El documento del post guardado.
 */
const create = async (post: Post) => {
    await connectToMongoDB()
    const newPost = new PostModel({
        content: post.content,
        title: post.title,
        user: post.user,
    })
    return await newPost.save()
}

/**
 * Obtiene todos los posts de la base de datos.
 * @returns Un array de posts.
 */
const getAll = async () => {
    await connectToMongoDB()
    const posts = await PostModel.find()
    return posts
}

// Exportamos un objeto de servicio con todos los métodos
export const postService = {
    create,
    getAll,
}
