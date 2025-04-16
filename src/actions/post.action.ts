import { PostModel } from '@/database/models/post.model'
import { connectToMongoDB } from '@/database/mongo'
import { Post } from '@/interfaces/post.interface'

export async function savePost(post: Post) {
    await connectToMongoDB()
    const newPost = new PostModel({
        content: post.content,
        title: post.title,
        user: post.user,
    })
    return await newPost.save()
}

export async function getPosts() {
    await connectToMongoDB()
    const posts = await PostModel.find()
    return posts
}
