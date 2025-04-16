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
})

let UserModel: Model<Omit<User, '_id'>>

if (!mongoose.models['User']) {
    UserModel = mongoose.model('User', UserSchema)
} else {
    UserModel = mongoose.models['User']
}

export { UserModel }
