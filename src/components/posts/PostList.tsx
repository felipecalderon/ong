
import { getPosts } from '@/actions/post.action'
import { Post } from '@/interfaces/post.interface';

interface PostListProps {
    postType: 'noticia' | 'denuncia' | 'recomendacion';
    userId?: string;
}

export default async function PostList({ postType, userId }: PostListProps) {
    const posts: Post[] = await getPosts({ postType, userId });

    if (!posts.length) {
        return <div>No se han encontrado publicaciones de tipo {postType}</div>;
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id} className="ProseMirror" dangerouslySetInnerHTML={{ __html: post.content }} />
            ))}
        </div>
    );
}
