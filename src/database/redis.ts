import Redis from 'ioredis'

export const redisClient = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: 2, // Reduce intentos fallidos para evitar bloqueos
    enableAutoPipelining: true, // Mejora rendimiento agrupando comandos
    connectTimeout: 10000, // Tiempo de espera de conexión (10s)
    lazyConnect: true, // No conecta hasta que sea necesario
})

redisClient.on('error', (err) => {
    console.error('❌ Redis Error:', err)
})
