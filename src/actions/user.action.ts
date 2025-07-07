'use server'
import { UserModel } from '@/database/models/user.model'
import { connectToMongoDB } from '@/database/mongo'
import { User } from '@/interfaces/user.interface'
import { hash } from 'bcryptjs'

export async function registerUser(user: Omit<User, '_id'>) {
    await connectToMongoDB()
    const existingUser = await UserModel.findOne({ email: user.email })
    if (existingUser) {
        throw new Error('El correo electrónico ya está en uso.')
    }

    const hashedPassword = await hash(user.password, 12)
    const newUser = new UserModel({
        ...user,
        password: hashedPassword,
    })

    const newUserDB = await newUser.save()
    const jsonUser = newUserDB.toObject()
    return jsonUser
}

export async function getUser(email?: string): Promise<User | null> {
    await connectToMongoDB()
    if (!email) return null
    return await UserModel.findOne({ email })
}
