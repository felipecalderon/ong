'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { User } from '@/interfaces/user.interface'
import { updateUser } from '@/actions/user.action'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface ProfileFormProps {
    user: User
}

const initialState = {
    success: false,
    message: '',
    data: null,
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type='submit' disabled={pending} className='w-full'>
            {pending ? 'Guardando cambios...' : 'Guardar Cambios'}
        </Button>
    )
}

export function ProfileForm({ user }: ProfileFormProps) {
    const { update } = useSession()
    const [state, formAction] = useActionState(updateUser, initialState)

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
        <form action={formAction} className='space-y-6'>
            <input type='hidden' name='userId' value={user._id} />
            <div className='space-y-2'>
                <Label htmlFor='name'>Nombre</Label>
                <Input id='name' name='name' defaultValue={user.name} maxLength={30} required />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='email'>Correo Electrónico</Label>
                <Input id='email' name='email' type='email' defaultValue={user.email} readOnly className='cursor-not-allowed bg-gray-100' />
            </div>
            <SubmitButton />
        </form>
    )
}
