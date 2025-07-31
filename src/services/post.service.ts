import { PostModel } from '@/database/models/post.model'
import { connectToMongoDB } from '@/database/mongo'
import { Post, NewPost } from '@/interfaces/post.interface'

/**
 * Crea un nuevo post en la base de datos.
 * @param post - El objeto del post a guardar.
 * @returns El documento del post guardado.
 */
const create = async (post: NewPost): Promise<Post> => {
    await connectToMongoDB()
    const newPost = new PostModel(post)
    const postDB = await newPost.save()
    const strPost = JSON.stringify(postDB)
    return JSON.parse(strPost)
}

/**
 * Obtiene todos los posts de la base de datos.
 * @returns Un array de posts.
 */
const getAll = async ({ postType, userId }: { postType?: 'noticia' | 'denuncia' | 'recomendacion', userId?: string }): Promise<Post[]> => {
    await connectToMongoDB()

    interface Where {
        postType?: string;
        user?: string;
    }

    let where: Where = {};

    if (postType) {
        where.postType = postType;
    }

    if (userId) {
        where.user = userId;
    }

    const posts = await PostModel.find(where)
        .populate('user', ['name', 'email', 'image'])
        .populate('comments.user', ['name', 'email', 'image'])
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
        .populate('user', ['name', 'email', 'image'])
        .populate('comments.user', ['name', 'email', 'image'])
    return post
}

// Exportamos un objeto de servicio con todos los métodos
export const postService = {
    create,
    getAll,
    getById,
}
