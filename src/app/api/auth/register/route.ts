import { saveUser } from '@/actions/user.action'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        const user = await req.json()
        await saveUser(user)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, error: (error as Error).message })
    }
}
