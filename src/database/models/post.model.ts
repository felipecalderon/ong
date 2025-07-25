import { Post } from '@/interfaces/post.interface'
import mongoose, { Model } from 'mongoose'

export const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
})

PostSchema.set('timestamps', true)
export const PostModel: Model<Post> = mongoose.models?.Post ?? mongoose.model<Post>('Post', PostSchema)
