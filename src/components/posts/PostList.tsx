import { getPosts } from '@/actions/post.action'

interface PostListProps {
    postType: 'noticia' | 'denuncia' | 'recomendacion'
    userId?: string
}

export default async function PostList({ postType, userId }: PostListProps) {
    const { data } = await getPosts({ postType, userId })

    if (!data) {
        return <div>No se han encontrado publicaciones de tipo {postType}</div>
    }

    return (
        <div>
            {data.map((post) => (
                <div key={post._id} className='ProseMirror' dangerouslySetInnerHTML={{ __html: post.content }} />
            ))}
        </div>
    )
}
