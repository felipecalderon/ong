import { Schema } from 'mongoose'

// Definimos el esquema de comentarios primero
export const CommentSchema = new Schema(
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
