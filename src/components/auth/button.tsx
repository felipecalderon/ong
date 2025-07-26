'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { motion } from 'motion/react'
import { AnimatedAvatar } from '../ui/avatar'
import { useState } from 'react'
import { HoveredLink, Menu, MenuItem } from '../ui/dropdown-menu'

export default function AuthButton() {
    const { data: session } = useSession()
    const [active, setActive] = useState<boolean>(false)
    const [isVisibleDropdown, setIsVisibleDd] = useState<boolean>(false)

    return (
        <div className='flex items-center justify-center'>
            {session ? (
                // Si el usuario está autenticado, mostramos su avatar y el botón de logout
                <div
                    className='flex items-center gap-4'
                    onMouseEnter={() => {
                        setIsVisibleDd(true)
                    }}
                    onMouseLeave={() => {
                        setIsVisibleDd(false)
                    }}>
                    <AnimatedAvatar user={session.user} />
                    <motion.div transition={{ duration: 0.3 }} whileHover={{ opacity: 1, scale: 1.1 }} initial={{ opacity: 0.7 }}>
                        <Menu setActive={setActive}>
                            <MenuItem setActive={setActive} active={active}>
                                <div className='flex flex-col space-y-4 text-sm'>
                                    <HoveredLink href={`/posts?userID=${session.user.id}`}>Mis denuncias</HoveredLink>
                                    <HoveredLink
                                        href='#'
                                        onClick={() => {
                                            signOut()
                                        }}>
                                        Cerrar sesión
                                    </HoveredLink>
                                </div>
                            </MenuItem>
                        </Menu>
                    </motion.div>
                </div>
            ) : (
                <button
                    onClick={() => signIn()}
                    className='bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md transition-all hover:bg-blue-600 focus:ring-2 focus:ring-blue-400'>
                    Iniciar sesión
                </button>
            )}
        </div>
    )
}
