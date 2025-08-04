'use server'
import { User } from '@/interfaces/user.interface'
import { UserService } from '@/services/user.service'
import { revalidatePath } from 'next/cache'

// Tipos
type UpdateUserInput = Partial<Pick<User, 'name' | 'email'>>
type FormState = {
    success: boolean
    message: string
    data: User | null
}

/**
 * Server Action para registrar un nuevo usuario.
 */
export const registerUser = async (user: Omit<User, '_id'>) => {
    try {
        const newUser = await UserService.register(user)
        return {
            success: true,
            data: newUser,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Ocurrió un error desconocido',
        }
    }
}

/**
 * Server Action para obtener un usuario por su email.
 */
export const getUser = async (email?: string): Promise<User | null> => {
    return await UserService.getByEmail(email)
}

/**
 * Server Action para actualizar la información de un usuario.
 */
export const updateUser = async (currentState: FormState, formData: FormData): Promise<FormState> => {
    try {
        const userId = formData.get('userId') as string
        const data: UpdateUserInput = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
        }

        const updatedUser = await UserService.update(userId, data)

        revalidatePath('/perfil') // Invalida la caché de la página de perfil

        return {
            success: true,
            message: '¡Perfil actualizado con éxito!',
            data: updatedUser, // Devuelve el usuario actualizado
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'No se pudo actualizar el perfil.',
            data: null,
        }
    }
}

export const updateUserImage = async (userEmail: string, newBase64Image: string) => {
    try {
        const updatedUser = await UserService.updateProfileImage(userEmail, newBase64Image)
        revalidatePath('/perfil')
        return {
            success: true,
            data: updatedUser,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Ocurrió un error desconocido',
        }
    }
}

/**
 * Server Action para actualizar la imagen de perfil de un usuario, adaptada para useActionState.
 */
export const updateUserImageAction = async (currentState: FormState, formData: FormData): Promise<FormState> => {
    try {
        const email = formData.get('email') as string
        const imageBase64 = formData.get('imageBase64') as string

        if (!email || !imageBase64) {
            throw new Error('Faltan datos para actualizar la imagen.')
        }

        const updatedUser = await UserService.updateProfileImage(email, imageBase64)
        revalidatePath('/perfil')

        return {
            success: true,
            message: '¡Imagen de perfil actualizada con éxito!',
            data: updatedUser,
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'No se pudo actualizar la imagen.',
            data: null,
        }
    }
}
