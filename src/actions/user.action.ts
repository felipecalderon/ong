import { redisClient } from '@/database/redis'
import { User } from '@/interfaces/user.interface'
import { hash } from 'bcryptjs'

const KEY_PREFIX = 'user:'

export async function saveUser(user: User) {
    const key = `${KEY_PREFIX}${user.email}`
    user.password = await hash(user.password, 10)
    return await redisClient.set(key, JSON.stringify(user)) // No expira
}

export async function getUser(email?: string): Promise<User | null> {
    if (!email) return null
    const key = `${KEY_PREFIX}${email}`
    const userStr = await redisClient.get(key)
    if (!userStr) return null
    return JSON.parse(userStr)
}
