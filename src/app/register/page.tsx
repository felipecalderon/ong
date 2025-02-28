'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/interfaces/user.interface'

export default function RegisterPage() {
    const [user, setUser] = useState<User>({
        id: '',
        name: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })

        if (!res.ok) {
            setError('Hubo un error al registrarte')
        } else {
            router.push('/login') // Redirigir tras registro exitoso
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold text-center text-gray-700'>Crear cuenta</h2>
                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
                <form className='mt-4' onSubmit={handleSubmit}>
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
