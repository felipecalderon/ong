import mongoose from 'mongoose'

let isConnected = false

export const connectToMongoDB = async () => {
    if (isConnected) {
        // Si ya está conectada, se retorna la conexión existente
        return
    }

    if (!process.env.MONGO_URL) {
        throw new Error('No se ha definido la URL de MongoDB')
    }

    try {
        await mongoose.connect(process.env.MONGO_URL)
        isConnected = true
        console.log('Conexión a MongoDB exitosa')
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error)
        isConnected = false
        throw error
    }
}
