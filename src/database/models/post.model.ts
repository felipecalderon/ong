import mongoose, { Model, Schema } from 'mongoose'
import { Post } from '@/interfaces/post.interface'
import { CommentSchema } from './comment.model'
import './user.model' // Import for side effect to ensure user schema is registered

// esquema principal del Post
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
            type: [String],
            default: [],
            required: function () {
                return this.postType === 'denuncia'
            },
        },
        comments: [CommentSchema],
    },
    { timestamps: true }
)

export const PostModel: Model<Post> = mongoose.models.Post || mongoose.model<Post>('Post', PostSchema)
