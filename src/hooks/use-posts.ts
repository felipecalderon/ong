'use client'

import { getPosts } from '@/actions/post.action'
import { Post } from '@/interfaces/post.interface'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function usePosts() {
    const { data: session } = useSession()
    const [posts, setPosts] = useState<Post[]>([])

    const getUsrPosts = async (userID?: string) => {
        const posts = getPosts(userID)
        return posts
    }

    useEffect(() => {
        if (session) {
            getUsrPosts(session.user.id).then((res) => setPosts(res))
        }
    }, [session])

    return { posts }
}
