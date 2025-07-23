export interface Post {
    _id: string
    title: string
    content: string
    user: string
    createdAt: string
    upadtedAt: string
}

export type PostBeforeCreated = Pick<Post, 'title' | 'content' | 'user'>
