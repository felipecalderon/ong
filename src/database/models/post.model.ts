import { Post } from '@/interfaces/post.interface'
import mongoose from 'mongoose'

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

let PostModel: mongoose.Model<Post>

if (!mongoose.models['Post']) {
    PostModel = mongoose.model('Post', PostSchema)
} else {
    PostModel = mongoose.models['Post']
}

export { PostModel }
