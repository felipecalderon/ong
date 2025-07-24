import { PostModel } from '@/database/models/post.model'
import { connectToMongoDB } from '@/database/mongo'
import { Post, PostBeforeCreated } from '@/interfaces/post.interface'

/**
 * Crea un nuevo post en la base de datos.
 * @param post - El objeto del post a guardar.
 * @returns El documento del post guardado.
 */
const create = async (post: PostBeforeCreated): Promise<Post> => {
    await connectToMongoDB()
    const newPost = new PostModel({
        content: post.content,
        title: post.title,
        user: post.user,
    })
    const postDB = await newPost.save()
    const strPost = JSON.stringify(postDB)
    return JSON.parse(strPost)
}

/**
 * Obtiene todos los posts de la base de datos.
 * @returns Un array de posts.
 */
const getAll = async (userID?: string): Promise<Post[]> => {
    await connectToMongoDB()
    interface WherePostByID {
        user?: string
    }

    let where: WherePostByID = {}

    if (userID) {
        where.user = userID
    }
    console.log(where)
    const posts = await PostModel.find(where)
    const strPost = JSON.stringify(posts)
    return JSON.parse(strPost)
}

/**
 * Obtiene un post por su ID.
 * @param id - El ID del post.
 * @returns El post encontrado o null.
 */
const getById = async (id: string) => {
    await connectToMongoDB()
    const post = await PostModel.findById(id)
    return post
}

// Exportamos un objeto de servicio con todos los métodos
export const postService = {
    create,
    getAll,
    getById,
}
