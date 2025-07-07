'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { registerUser } from '@/actions/user.action' // Importamos la Server Action

export default function RegisterPage() {
    const [isPending, startTransition] = useTransition()
    const params = useSearchParams()

    const name = params.get('name')
    const email = params.get('email')
    const image = params.get('image')

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
    })

    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        console.log({ user })
        try {
            startTransition(async () => {
                await registerUser(user) // Llamada directa a la Server Action
                router.push('/login') // Redirigir tras registro exitoso
            })
        } catch (err: any) {
            setError(err.message || 'Hubo un error al registrarte')
        }
    }

    useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            ...(name && { name }),
            ...(email && { email }),
            ...(image && { image }),
        }))
    }, [name, email, image])

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:text-slate-800'>
            <div className='bg-white p-8 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold text-center text-gray-700'>Crear cuenta</h2>
                {name && (
                    <p className='text-sm text-center'>
                        Estimad@ {name}, para acceder a la plataforma y vincular tu cuenta de Google, necesitas completar tus datos.
                    </p>
                )}
                {user.image && <img src={user.image} alt='Previsualización' className='mt-2 mx-auto w-20 h-20 object-cover rounded-full' />}
                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-600'>Imágen de perfil</label>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onloadend = () => {
                                        setUser((prevUser) => ({ ...prevUser, image: reader.result as string }))
                                    }
                                    reader.readAsDataURL(file)
                                }
                            }}
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-600'>Nombre</label>
                        <input
                            type='name'
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-600'>Correo electrónico</label>
                        <input
                            type='email'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-600'>Contraseña</label>
                        <input
                            type='password'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>
                    <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition'>
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    )
}
