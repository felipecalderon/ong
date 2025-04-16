import { UserModel } from '@/database/models/user.model'
import { connectToMongoDB } from '@/database/mongo'
import { User } from '@/interfaces/user.interface'
import { hash } from 'bcryptjs'

const KEY_PREFIX = 'user:'

export async function saveUser(user: Omit<User, '_id'>) {
    await connectToMongoDB()
    console.log(user)
    const hashPassword = await hash(user.password, 12)
    const newUser = new UserModel({
        email: user.email,
        name: user.name,
        password: hashPassword,
        image: user.image,
    })
    return await newUser.save()
}

export async function getUser(email?: string): Promise<User | null> {
    await connectToMongoDB()
    if (!email) return null
    return await UserModel.findOne({ email })
}
