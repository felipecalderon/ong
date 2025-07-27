import { User } from '@/interfaces/user.interface'
import { type Model } from 'mongoose'
import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
})

export const UserModel: Model<User> = mongoose.models?.User ?? mongoose.model<User>('User', UserSchema)
