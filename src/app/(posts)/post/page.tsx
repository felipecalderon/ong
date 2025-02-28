import { getPosts } from '@/actions/post.action'

export default async function Post() {
    const post = await getPosts()
    if (!post.length) return <div>No se han encontrado posts</div>
    return post.map((post) => <div className='ProseMirror' dangerouslySetInnerHTML={{ __html: post }} />)
}
