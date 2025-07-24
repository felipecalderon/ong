'use client'

import React, { useState } from 'react'
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react'
interface AvatarProps {
    id: string
    name: string
    email: string
    image: string
}

export const AnimatedAvatar = ({ user }: { user: AvatarProps }) => {
    const [hoveredIndex, setHoveredIndex] = useState<boolean>(false)
    const springConfig = { stiffness: 100, damping: 5 }
    const x = useMotionValue(0) // going to set this value on mouse move
    // rotate the tooltip
    const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)
    // translate the tooltip
    const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig)
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2
        x.set(event.nativeEvent.offsetX - halfWidth) // set the x value, which is then used in transform and rotate
    }

    return (
        <div className='group relative -mr-4' onMouseEnter={() => setHoveredIndex(true)} onMouseLeave={() => setHoveredIndex(false)}>
            <AnimatePresence mode='popLayout'>
                {hoveredIndex && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 0.8,
                            transition: {
                                type: 'spring',
                                stiffness: 260,
                                damping: 10,
                            },
                        }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        style={{
                            translateX: translateX,
                            rotate: rotate,
                            whiteSpace: 'nowrap',
                        }}
                        className='absolute top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl'>
                        <div className='absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent' />
                        <div className='absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent' />
                        <div className='relative z-30 text-base font-bold text-white'>¡Hola {user.name}!</div>
                        <div className='text-xs text-white'>{user.email}</div>
                    </motion.div>
                )}
            </AnimatePresence>
            <img
                onMouseMove={handleMouseMove}
                height={100}
                width={100}
                src={user.image}
                alt={user.name}
                className='relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105'
            />
        </div>
    )
}
