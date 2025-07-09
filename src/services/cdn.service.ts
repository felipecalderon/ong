import { v2 as cloudinary } from 'cloudinary'

// Configuración de Cloudinary usando variables de entorno
cloudinary.config({
    cloud_name: process.env.CDN_NAME,
    api_key: process.env.CDN_APIKEY,
    api_secret: process.env.CDN_SECRET,
    secure: true,
})

export class CdnService {
    /**
     * Extrae el public_id de una URL de Cloudinary.
     * @param imageUrl - La URL completa de la imagen.
     * @returns El public_id de la imagen (ej: 'usuarios/image_id').
     * @private
     */
    private static getPublicIdFromUrl(imageUrl: string): string {
        // Extrae la parte de la URL después de la versión y antes de la extensión
        const regex = /v\d+\/(.+?)\.\w+$/
        const match = imageUrl.match(regex)
        if (!match || !match[1]) {
            throw new Error('URL de Cloudinary no válida')
        }
        return match[1]
    }

    /**
     * Sube una nueva imagen codificada en base64 a Cloudinary.
     * @param base64Image - La cadena de la imagen en formato base64.
     * @param folder - La carpeta en Cloudinary donde se guardará.
     * @returns La URL segura de la imagen subida.
     */
    static async upload(base64Image: string, folder: string): Promise<string> {
        try {
            const result = await cloudinary.uploader.upload(base64Image, {
                folder: `ong/${folder}`,
            })
            return result.secure_url
        } catch (error) {
            console.error('Error al subir la imagen a Cloudinary:', error)
            throw new Error('No se pudo subir la imagen.')
        }
    }

    /**
     * Reemplaza una imagen existente en Cloudinary por una nueva.
     * @param oldImageUrl - La URL de la imagen a reemplazar.
     * @param newBase64Image - La nueva imagen en formato base64.
     * @returns La URL segura de la nueva imagen.
     */
    static async replace(oldImageUrl: string, newBase64Image: string): Promise<string> {
        try {
            const publicId = this.getPublicIdFromUrl(oldImageUrl)
            // Sube la nueva imagen sobreescribiendo la anterior usando su public_id
            const result = await cloudinary.uploader.upload(newBase64Image, {
                public_id: publicId,
                overwrite: true,
            })
            return result.secure_url
        } catch (error) {
            console.error('Error al reemplazar la imagen en Cloudinary:', error)
            throw new Error('No se pudo reemplazar la imagen.')
        }
    }

    /**
     * Elimina una imagen de Cloudinary.
     * @param imageUrl - La URL de la imagen a eliminar.
     * @returns Un objeto con el resultado de la operación.
     */
    static async delete(imageUrl: string): Promise<{ result: string }> {
        try {
            const publicId = this.getPublicIdFromUrl(imageUrl)
            const result = await cloudinary.uploader.destroy(publicId)
            return result
        } catch (error) {
            console.error('Error al eliminar la imagen de Cloudinary:', error)
            throw new Error('No se pudo eliminar la imagen.')
        }
    }
}
