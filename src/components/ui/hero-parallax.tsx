'use client'
import React from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import Image from 'next/image'

export const HeroParallax = ({
    images,
    children,
}: {
    children: React.ReactNode
    images: {
        title: string
        thumbnail: string
    }[]
}) => {
    const firstRow = images.slice(0, 3)
    const secondRow = images.slice(3, 6)
    const thirdRow = images.slice(6, 9)
    const ref = React.useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    })

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

    const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), springConfig)
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig)
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig)
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.1, 1]), springConfig)
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig)
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 300]), springConfig)

    return (
        <div
            ref={ref}
            className='w-full h-[1200px] md:h-[1550px] lg:h-[1750px] relative py-20 antialiased flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] overflow-hidden'>
            {children}
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=''>
                <motion.div className='flex flex-row-reverse gap-6 mb-10 md:mb-20 overflow-visible'>
                    {firstRow.map((product) => (
                        <AnimalImage product={product} translate={translateX} key={product.title} />
                    ))}
                </motion.div>
                <motion.div className='flex flex-row gap-6 mb-10 md:mb-20 overflow-visible'>
                    {secondRow.map((product) => (
                        <AnimalImage product={product} translate={translateXReverse} key={product.title} />
                    ))}
                </motion.div>
                <motion.div className='flex flex-row-reverse gap-6 overflow-visible'>
                    {thirdRow.map((product) => (
                        <AnimalImage product={product} translate={translateX} key={product.title} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

interface AnimalImageProps {
    product: {
        title: string
        thumbnail: string
    }
    translate: MotionValue<number>
}

export const AnimalImage = ({ product, translate }: AnimalImageProps) => {
    return (
        <motion.div
            style={{ x: translate }}
            whileHover={{ scale: 1.05 }}
            className='group/product relative shrink-0 h-64 sm:h-72 md:h-80 lg:h-96 w-60 sm:w-72 md:w-80 lg:w-96'>
            <Image
                src={product.thumbnail}
                height={600}
                width={600}
                className='object-cover object-center absolute h-full w-full inset-0 group-hover/product:shadow-2xl transition-all'
                alt={product.title}
            />
        </motion.div>
    )
}
