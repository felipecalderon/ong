'use client'

import { useActionState, useEffect, useRef, useTransition } from 'react' // 1. Importar useTransition
import { useSession } from 'next-auth/react'
import NextImage from 'next/image'
import { toast } from 'sonner'
import { User } from '@/interfaces/user.interface'
import { updateUserImageAction } from '@/actions/user.action'

interface UpdateProfileImageProps {
    user: User
}

const initialState = {
    success: false,
    message: '',
    data: null,
}

export function UpdateProfileImage({ user }: UpdateProfileImageProps) {
    const { update } = useSession()
    const [state, formAction] = useActionState(updateUserImageAction, initialState)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isPending, startTransition] = useTransition()

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            const originalBase64 = e.target?.result as string
            const img = new Image()
            img.src = originalBase64

            img.onload = () => {
                const maxWidth = 800
                const scaleRatio = maxWidth / img.width
                const newWidth = img.width > maxWidth ? maxWidth : img.width
                const newHeight = img.width > maxWidth ? img.height * scaleRatio : img.height

                const canvas = document.createElement('canvas')
                canvas.width = newWidth
                canvas.height = newHeight

                const ctx = canvas.getContext('2d')
                ctx?.drawImage(img, 0, 0, newWidth, newHeight)

                // Comprimir a JPEG con calidad del 75%
                const resizedBase64 = canvas.toDataURL('image/jpeg', 0.75)

                const formData = new FormData()
                formData.append('email', user.email)
                formData.append('imageBase64', resizedBase64)

                startTransition(() => {
                    formAction(formData)
                })
            }
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message)
                update({ user: state.data })
            } else {
                toast.error(state.message)
            }
        }
    }, [state])

    return (
        <div className='relative w-64 h-64 mx-auto'>
            {/* No se necesita el form, pero lo mantenemos por si se extiende a futuro */}
            <form>
                <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                    accept='image/*'
                    disabled={isPending} // Deshabilitar mientras se sube
                />
                <NextImage
                    src={user.image ?? '/default-avatar.png'}
                    alt='Foto de perfil'
                    width={128}
                    height={128}
                    className={`w-64 h-64 rounded-full object-cover cursor-pointer border-4 border-gray-200 hover:border-gray-400 transition-all duration-300 ${
                        isPending ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title='Haz clic para cargar una imagen'
                    onClick={handleImageClick}
                />
            </form>
        </div>
    )
}
