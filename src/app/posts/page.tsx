import { getPosts } from '@/actions/post.action'
import { Button } from '@/components/ui/button'
import { User } from '@/interfaces/user.interface'
import Link from 'next/link'

interface SP {
    searchParams: Promise<{
        userID: string | undefined
    }>
}
export default async function CreatePostPage({ searchParams }: SP) {
    // El estado ahora se maneja aquí, en el componente padre.
    const { userID } = await searchParams
    const posts = await getPosts(userID)
    console.log(posts)
    return (
        <main className='container mx-auto px-4 py-12'>
            <div className='max-w-3xl mx-auto flex flex-col gap-6'>
                <h1 className='text-3xl font-bold'>Listado de posts</h1>
                <div className='grid grid-cols-3 place-content-center'>
                    {posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <h2>{post.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                <p>{(post.user as User).name}</p>
                                <Link href={`/posts/${post._id}`}>
                                    <Button>Ver detalles del Post</Button>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
