import { redirect } from 'next/navigation'
import { getUser } from '@/actions/user.action'
import { getPosts } from '@/actions/post.action'
import { ProfileForm } from '@/components/perfil/ProfileForm'
import { UserPostList } from '@/components/perfil/UserPostList'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/actions/auth.action'

export default async function ProfilePage() {
    const session = await auth()
    console.log({ session })
    if (!session?.user?.email) {
        redirect('/login')
    }

    const user = await getUser(session.user.email)
    console.log({ user })
    if (!user) {
        // Manejar el caso en que el usuario no se encuentra en la BD
        redirect('/login')
    }

    const userPosts = await getPosts({ postType: 'noticia', userId: user._id })

    return (
        <main className='container mx-auto px-4 py-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
                {/* Columna de Información Personal */}
                <div className='md:col-span-1'>
                    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-8'>
                        <h2 className='text-2xl font-bold mb-6 text-center'>Mi Perfil</h2>
                        <ProfileForm user={user} />
                    </div>
                </div>

                {/* Columna de Publicaciones */}
                <div className='md:col-span-2'>
                    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-8'>
                        <h2 className='text-2xl font-bold mb-6'>Mis Publicaciones</h2>
                        <Separator className='mb-6' />
                        <UserPostList posts={userPosts} />
                    </div>
                </div>
            </div>
        </main>
    )
}
