'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { Post } from '@/interfaces/post.interface'
// import { deletePost } from '@/actions/post.action'
import { Button } from '@/components/ui/button'
import { deletePost } from '@/actions/post.action'

interface UserPostListProps {
    success: boolean
    data: Post[]
}

export function UserPostList({ success, data }: UserPostListProps) {
    console.log({ data })
    const [isPending, startTransition] = useTransition()

    const handleDelete = (postId: string) => {
        startTransition(async () => {
            const result = await deletePost(postId)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        })
    }

    if (data.length === 0) {
        return <p className='text-center text-gray-500'>Aún no has creado ninguna publicación.</p>
    }

    return (
        <div className='space-y-4'>
            {data.map((post) => (
                <div key={post._id} className='flex items-center justify-between p-4 border rounded-lg'>
                    <span className='font-medium'>{post.title}</span>
                    <div className='space-x-2'>
                        <Button variant='outline' size='sm'>
                            Editar
                        </Button>
                        <Button variant='destructive' size='sm' onClick={() => handleDelete(post._id)} disabled={isPending}>
                            {isPending ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
