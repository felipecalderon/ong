'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function AuthButton() {
    const { data: session } = useSession()

    return (
        <div className='flex items-center justify-center'>
            {session ? (
                // Si el usuario está autenticado, mostramos su avatar y el botón de logout
                <div className='flex items-center gap-4'>
                    <Image
                        src={session.user?.image || '/default-avatar.png'}
                        alt='User Avatar'
                        className='w-10 h-10 rounded-full border-2 border-gray-300 shadow-md'
                        width={40}
                        height={40}
                    />
                    {/* <button
                        onClick={() => signOut()}
                        className='bg-red-500 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:bg-red-600 focus:ring-2 focus:ring-red-400'>
                        Cerrar sesión
                    </button> */}
                </div>
            ) : (
                // Si no está autenticado, mostramos el botón de login
                <button
                    onClick={() => signIn()}
                    className='bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md transition-all hover:bg-blue-600 focus:ring-2 focus:ring-blue-400'>
                    Iniciar sesión
                </button>
            )}
        </div>
    )
}
