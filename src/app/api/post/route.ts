import { savePost } from '@/actions/post.action'
import { Post } from '@/interfaces/post.interface'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        const post: Post = await req.json()
        await savePost(post)
        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ seccess: false, error: error.message })
        }
        return NextResponse.json({ seccess: false, error: error })
    }
}
