'use server'
import { postService } from '@/services/post.service'
import { PostBeforeCreated } from '@/interfaces/post.interface'

export async function savePost(post: PostBeforeCreated) {
    return await postService.create(post)
}

export async function getPosts(userID?: string) {
    return await postService.getAll(userID)
}

export async function getPost(id: string) {
    return await postService.getById(id)
}
