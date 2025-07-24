'use client'
import React, { HTMLAttributes } from 'react'
import { AnimationGeneratorType, motion } from 'motion/react'
import Link from 'next/link'
import { FaDoorClosed } from 'react-icons/fa6'
import { FaLevelDownAlt } from 'react-icons/fa'

interface LinkProps {
    children: React.ReactNode
    href: string
}

type Props = LinkProps & HTMLAttributes<HTMLAnchorElement>

const transition = {
    type: 'spring' as AnimationGeneratorType,
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
}

export const MenuItem = ({ setActive, active, children }: { setActive: (item: boolean) => void; active: boolean; children?: React.ReactNode }) => {
    return (
        <div onMouseEnter={() => setActive(true)} className='relative '>
            <motion.p
                transition={{ duration: 0.3 }}
                className='cursor-pointer flex flex-row gap-2 items-center text-black hover:opacity-[0.9] dark:text-white'>
                <FaLevelDownAlt />
            </motion.p>
            {active !== null && (
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1, y: -15 }} transition={transition}>
                    {active && (
                        <div className='absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4'>
                            <motion.div
                                transition={transition}
                                layoutId='active' // layoutId ensures smooth animation
                                className='bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl'>
                                <motion.div
                                    layout // layout ensures smooth animation
                                    className='w-max h-full p-4'>
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    )
}

export const Menu = ({ setActive, children }: { setActive: (item: boolean) => void; children: React.ReactNode }) => {
    return (
        <nav
            onMouseLeave={() => setActive(false)} // resets the state
            className='relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-4 py-2 '>
            {children}
        </nav>
    )
}

export const HoveredLink = ({ children, ...rest }: Props) => {
    return (
        <Link {...rest} className='text-neutral-700 dark:text-neutral-200 hover:text-black '>
            {children}
        </Link>
    )
}
