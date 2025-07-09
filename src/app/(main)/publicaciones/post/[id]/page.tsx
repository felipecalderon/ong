import { getPost } from '@/actions/post.action'

interface Params {
    params: Promise<{
        id: string
    }>
}
export default async function Post({ params }: Params) {
    const { id } = await params
    const post = await getPost(id)
    if (!post) return <div>No se ha encontrado el post</div>
    return <div className='ProseMirror' dangerouslySetInnerHTML={{ __html: post }} />
}
