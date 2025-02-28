import { savePost } from '@/actions/post.action'
import { NextRequest, NextResponse } from 'next/server'

interface Post {
    id: string
    text: string
}

export const POST = async (req: NextRequest) => {
    try {
        const { id, text }: Post = await req.json()
        await savePost(id, text)
        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ seccess: false, error: error.message })
        }
        return NextResponse.json({ seccess: false, error: error })
    }
}
