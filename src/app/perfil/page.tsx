'use client'

import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateUserImage } from '@/actions/user.action' // Crearemos esta acción
import { toast } from 'sonner'

export default function ProfilePage() {
    const [isLoading, startTransition] = useTransition()
    const { data: session, update } = useSession()
    const [newImage, setNewImage] = useState<string | null>(null)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        startTransition(async () => {
            event.preventDefault()
            if (!newImage) return
            if (!session?.user) return
            const result = await updateUserImage(session.user.email!, newImage)

            if (result.success && result.data) {
                // Llama a update con los nuevos datos para activar el callback JWT
                await update({
                    ...session,
                    user: {
                        ...session.user,
                        image: result.data.image,
                    },
                })
                toast.success('¡Foto de perfil actualizada con éxito!')
                setNewImage(null)
            } else {
                toast.error(result.error || 'No se pudo actualizar la imagen.')
            }
        })
    }

    if (!session) {
        return <div>Cargando...</div> // O un componente de esqueleto
    }

    const profileImage = newImage || session.user?.image || '/default-avatar.png'

    return (
        <main className='container mx-auto px-4 py-12'>
            <h1 className='text-3xl font-bold text-center mb-8'>Mi Perfil</h1>
            <div className='max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center space-y-6'>
                        <div className='relative'>
                            <Image
                                src={profileImage}
                                alt='Foto de perfil'
                                width={128}
                                height={128}
                                className='rounded-full object-cover w-32 h-32 ring-2 ring-offset-2 ring-blue-500'
                            />
                            <Label
                                htmlFor='profile-picture'
                                className='absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer hover:bg-gray-600 transition-colors'>
                                ✏️
                            </Label>
                            <Input id='profile-picture' type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
                        </div>

                        <div className='text-center'>
                            <h2 className='text-2xl font-semibold'>{session.user?.name}</h2>
                            <p className='text-gray-500 dark:text-gray-400'>{session.user?.email}</p>
                        </div>

                        {newImage && (
                            <Button type='submit' disabled={isLoading} className='w-full'>
                                {isLoading ? 'Guardando...' : 'Guardar Nueva Foto'}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </main>
    )
}
