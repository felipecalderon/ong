'use client'

import { useActionState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
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
    const updateUserWithId = updateUser.bind(null, user._id)
    const [state, formAction] = useActionState(updateUserWithId, initialState)

    useEffect(() => {
        if (state.message) {
            state.success ? toast.success(state.message) : toast.error(state.message)
        }
    }, [state])

    return (
        <form action={formAction} className='space-y-6'>
            <div className='space-y-2'>
                <Label htmlFor='name'>Nombre</Label>
                <Input id='name' name='name' defaultValue={user.name} required />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='email'>Correo Electrónico</Label>
                <Input id='email' name='email' type='email' defaultValue={user.email} required />
            </div>
            <SubmitButton />
        </form>
    )
}
