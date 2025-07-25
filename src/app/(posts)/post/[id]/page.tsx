import { getPost } from '@/actions/post.action'
import { Metadata } from 'next'

interface PostPageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { id } = await params
    const post = await getPost(id)
    return {
        title: post?.title || 'Post no encontrado',
        description: post?.content ? post?.content.substring(0, 150) + '...' : 'Descripción del post',
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params
    const post = await getPost(id)

    if (!post) {
        return (
            <main className='container mx-auto px-4 py-12 text-center'>
                <h1 className='text-4xl font-bold text-red-600'>Post no encontrado</h1>
                <p className='text-lg text-gray-600 mt-4'>Lo sentimos, el post que buscas no existe o ha sido eliminado.</p>
            </main>
        )
    }

    return (
        <main className='container mx-auto px-4 py-12'>
            <article className='max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
                <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>{post.title}</h1>
                <p className='text-gray-600 dark:text-gray-400 text-sm mb-6'>
                    Publicado por: {post.user} | Fecha: {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className='prose dark:prose-invert max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </main>
    )
}
