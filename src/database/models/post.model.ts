import { Post } from '@/interfaces/post.interface'
import mongoose, { Model } from 'mongoose'

export const PostSchema = new mongoose.Schema({
    _id: {
        type: String,
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
        type: String,
        required: true,
    },
})

export const PostModel: Model<Post> = mongoose.models?.Post ?? mongoose.model<Post>('Post', PostSchema)
