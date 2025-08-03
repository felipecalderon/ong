import { UserModel } from '@/database/models/user.model'
import { connectToMongoDB } from '@/database/mongo'
import { User } from '@/interfaces/user.interface'
import { hash } from 'bcryptjs'
import { CdnService } from './cdn.service'

export class UserService {
    /**
     * Registra un nuevo usuario en la base de datos.
     * Si se proporciona una imagen en base64, la sube a Cloudinary.
     * @param user - Datos del usuario para el registro.
     * @returns El objeto del usuario creado.
     * @throws Si el correo electrónico ya está en uso.
     */
    static async register(user: Omit<User, '_id'>): Promise<Omit<User, '_id'> | null> {
        await connectToMongoDB()
        const existingUser = await UserModel.findOne({ email: user.email })
        if (existingUser) {
            throw new Error('El correo electrónico ya está en uso.')
        }

        let imageUrl = user.image // Puede ser undefined o una URL por defecto

        // Si se proporciona una nueva imagen en formato base64, subirla a Cloudinary
        if (user.image && user.image.startsWith('data:image')) {
            imageUrl = await CdnService.upload(user.image, 'usuarios')
        }
        if (!user.password) return null
        const hashedPassword = await hash(user.password, 12)
        const newUser = new UserModel({
            ...user,
            password: hashedPassword,
            image: imageUrl, // Guardar la URL de Cloudinary o la imagen por defecto
        })

        const newUserDB = await newUser.save()
        const jsonUser = newUserDB.toObject()
        return jsonUser as Omit<User, '_id'>
    }

    /**
     * Busca un usuario por su correo electrónico.
     * @param email - El email del usuario a buscar.
     * @returns El documento del usuario o null si no se encuentra.
     */
    static async getByEmail(email?: string): Promise<User | null> {
        if (!email) return null
        await connectToMongoDB()
        const findedUser = await UserModel.findOne({ email }).populate('posts')
        const jsonUser = JSON.stringify(findedUser)

        return JSON.parse(jsonUser) as User | null
    }

    /**
     * Actualiza la información de un usuario (nombre, email).
     * @param userId - El ID del usuario a actualizar.
     * @param data - Los datos a actualizar.
     * @returns El usuario actualizado.
     */
    static async update(userId: string, data: Partial<Pick<User, 'name' | 'email'>>): Promise<User | null> {
        await connectToMongoDB()
        const updatedUser = await UserModel.findByIdAndUpdate(userId, data, { new: true })
        if (!updatedUser) {
            throw new Error('Usuario no encontrado.')
        }
        return updatedUser.toObject() as User | null
    }

    /**
     * Actualiza la imagen de perfil de un usuario.
     * @param userId - El ID del usuario a actualizar.
     * @param newBase64Image - La nueva imagen en formato base64.
     * @returns El usuario actualizado con la nueva URL de la imagen.
     */
    static async updateProfileImage(userEmail: string, newBase64Image: string): Promise<User | null> {
        await connectToMongoDB()
        const user = await UserModel.findOne({
            email: userEmail,
        })

        if (!user) {
            throw new Error('Usuario no encontrado.')
        }

        let newImageUrl: string

        // Si el usuario ya tiene una imagen en Cloudinary, la reemplazamos.
        if (user.image && user.image.includes('cloudinary')) {
            newImageUrl = await CdnService.replace(user.image, newBase64Image)
        } else {
            // Si no tiene imagen o es una por defecto, subimos una nueva.
            newImageUrl = await CdnService.upload(newBase64Image, 'usuarios')
        }

        // Actualizamos el documento del usuario con la nueva URL
        user.image = newImageUrl
        const updatedUser = await user.save()
        const jsonUser = JSON.stringify(updatedUser)

        return JSON.parse(jsonUser) as User | null
    }
}
