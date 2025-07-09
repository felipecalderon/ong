'use server'
import { User } from '@/interfaces/user.interface'
import { UserService } from '@/services/user.service'

/**
 * Server Action para registrar un nuevo usuario.
 * Invoca a UserService para manejar la lógica de negocio.
 * @param user - Datos del usuario desde el formulario.
 * @returns El usuario creado o un mensaje de error.
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
 * Invoca a UserService para manejar la lógica de negocio.
 * @param email - El email del usuario a buscar.
 * @returns El usuario encontrado o null.
 */
export const getUser = async (email?: string): Promise<User | null> => {
    // Para la obtención de datos (queries), a menudo se puede llamar directamente
    // al servicio sin un manejo de errores tan complejo como en las mutaciones.
    return await UserService.getByEmail(email)
}

/**
 * Server Action para actualizar la imagen de perfil de un usuario.
 * @param userEmail - El correo del usuario.
 * @param newBase64Image - La nueva imagen en formato base64.
 * @returns Un objeto con el resultado de la operación.
 */
export const updateUserImage = async (userEmail: string, newBase64Image: string) => {
    try {
        const updatedUser = await UserService.updateProfileImage(userEmail, newBase64Image)
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
