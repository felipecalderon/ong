import { postService } from '@/services/post.service'
import { Post } from '@/interfaces/post.interface'

export async function savePost(post: Post) {
    return await postService.create(post)
}

export async function getPosts() {
    return await postService.getAll()
}
