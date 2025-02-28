import { redisClient } from '@/database/redis'
import zlib from 'zlib'

const KEY_PREFIX = 'post:'

export async function savePost(id: string, text: string) {
    const key = `${KEY_PREFIX}${id}`
    const compressedText = zlib.deflateSync(text).toString('base64')
    return await redisClient.set(key, compressedText) // No expira
}

export async function getPost(id: string) {
    const key = `${KEY_PREFIX}${id}`
    const compressedText = await redisClient.get(key)
    return compressedText ? zlib.inflateSync(Buffer.from(compressedText, 'base64')).toString() : null
}

export async function getPosts() {
    const keys = await redisClient.keys(`${KEY_PREFIX}*`)
    const posts = await Promise.all(keys.map(async (key) => await getPost(key.replace(KEY_PREFIX, ''))))
    return posts.filter((p) => p !== null)
}
