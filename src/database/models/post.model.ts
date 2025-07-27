import mongoose, { Model, Schema } from 'mongoose'
import { Post } from '@/interfaces/post.interface'

// Definimos el esquema de comentarios primero
const CommentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        // La clave para los comentarios anidados
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment', // Se refiere a otro comentario dentro del mismo post
            required: false, // No es requerido, ya que los comentarios de nivel superior no tienen padre
        },
    },
    { timestamps: true }
)

// Ahora definimos el esquema principal del Post
const PostSchema = new Schema<Post>(
    {
        postType: {
            type: String,
            enum: ['denuncia', 'noticia', 'recomendacion'],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        categories: {
            type: [String],
            required: false,
            default: [],
        },
        // Campos específicos para denuncias
        status: {
            type: String,
            enum: ['pendiente', 'publicado', 'resuelto', 'rechazado'],
            default: 'pendiente',
            required: function () {
                return this.postType === 'denuncia'
            },
        },
        location: {
            type: String,
            required: function () {
                return this.postType === 'denuncia'
            },
        },
        evidence: {
            type: [String], // Array de URLs a las imágenes/videos
            default: [],
        },
        comments: [CommentSchema],
    },
    { timestamps: true }
)

export const PostModel: Model<Post> = mongoose.models.Post || mongoose.model<Post>('Post', PostSchema)
