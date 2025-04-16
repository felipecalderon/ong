'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/use-mouse-animation'

export default function CatFollower() {
    const svgRef = useRef<SVGSVGElement>(null)
    const mousePosition = useMousePosition()
    const [svgRect, setSvgRect] = useState<DOMRect | null>(null)
    const [tailAnimation, setTailAnimation] = useState({
        rotate: [15, 5, 15],
        duration: 2,
    })

    useEffect(() => {
        const interval = setInterval(() => {
            // Cambiar a movimiento rápido y más amplio
            setTailAnimation({
                rotate: [10, 5, 10],
                duration: 0.4,
            })

            // Volver al movimiento suave después de un rato
            const timeout = setTimeout(() => {
                setTailAnimation({
                    rotate: [15, 5, 15],
                    duration: 2,
                })
            }, 3000) // cada 3 segundos

            // Limpiar el timeout si el componente se desmonta
            return () => clearTimeout(timeout)
        }, 5000 + Math.random() * 5000) // cada 5 a 10 segundos

        return () => clearInterval(interval)
    }, [])

    // Actualizar las dimensiones del SVG cuando cambia el tamaño de la ventana
    useEffect(() => {
        const updateSvgRect = () => {
            if (svgRef.current) {
                setSvgRect(svgRef.current.getBoundingClientRect())
            }
        }

        // Inicializar
        updateSvgRect()

        // Actualizar en resize
        window.addEventListener('resize', updateSvgRect)
        return () => window.removeEventListener('resize', updateSvgRect)
    }, [])

    // Constantes del SVG
    const viewBoxWidth = 493
    const viewBoxHeight = 470

    // Centros de los ojos en coordenadas del viewBox
    const leftEyeCenter = { x: 320.377, y: 152.253 }
    const rightEyeCenter = { x: 429.549, y: 152.253 }

    // Radio máximo para el movimiento de las pupilas (en unidades del viewBox)
    const maxPupilMovement = 15

    // Función para limitar el movimiento de las pupilas dentro de un radio
    const constrainPupilMovement = (eyeX: number, eyeY: number, targetX: number, targetY: number, maxRadius: number) => {
        // Vector desde el centro del ojo hasta el punto objetivo
        const dx = targetX - eyeX
        const dy = targetY - eyeY

        // Distancia entre el centro del ojo y el punto objetivo
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Si la distancia es menor que el radio máximo, usar el punto objetivo
        if (distance <= maxRadius) {
            return { x: targetX, y: targetY }
        }

        // Si no, calcular el punto en el borde del radio máximo
        const ratio = maxRadius / distance
        return {
            x: eyeX + dx * ratio,
            y: eyeY + dy * ratio,
        }
    }

    // Calcular la posición del mouse en coordenadas del viewBox
    let viewBoxMouseX = viewBoxWidth / 2
    let viewBoxMouseY = viewBoxHeight / 2

    if (svgRect && mousePosition.x !== null && mousePosition.y !== null) {
        // Posición relativa del mouse respecto al SVG
        const relativeMouseX = mousePosition.x - svgRect.left
        const relativeMouseY = mousePosition.y - svgRect.top

        // Convertir a coordenadas del viewBox
        const scaleX = viewBoxWidth / svgRect.width
        const scaleY = viewBoxHeight / svgRect.height
        viewBoxMouseX = relativeMouseX * scaleX
        viewBoxMouseY = relativeMouseY * scaleY
    }

    // Calcular posiciones de las pupilas con restricción
    const leftPupil = constrainPupilMovement(leftEyeCenter.x, leftEyeCenter.y, viewBoxMouseX, viewBoxMouseY, maxPupilMovement)
    const rightPupil = constrainPupilMovement(rightEyeCenter.x, rightEyeCenter.y, viewBoxMouseX, viewBoxMouseY, maxPupilMovement)

    return (
        <div className='fixed -bottom-2 right-0 z-50 w-40 h-auto pointer-events-none select-none text-yellow-500'>
            <motion.svg
                ref={svgRef}
                viewBox='0 0 493 470'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-full h-auto'
                transition={{
                    type: 'spring',
                    stiffness: 50,
                    damping: 15,
                }}>
                {/* Cuerpo del gato */}
                <motion.path
                    className='text-slate-900'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill='currentColor'
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 25,
                    }}
                    d='M162.5,469.1h236c52.3-.8,94.4-43.4,94.4-95.9s0-.5,0-.8c0,0,0-.2,0-.3,0-.1,0-.3,0-.4h0V71.4h0V15.3c.5-7.9-12.4-21.2-26.6-11.8-14,9.3-44.6,48.3-58.6,67.3h-62.6c-13.9-18.8-44.7-58.2-58.8-67.6-14.2-9.4-27,3.9-26.6,11.8v55.8h0v150.5h-3c-52.3.8-94.4,43.4-94.4,95.9s0,1,0,1.5h0v113.6M.5,226.8'
                />

                {/* Colita animada */}
                <motion.g
                    style={{ originX: '50%', originY: '100%', translateY: 20 }} // La base de la cola permanece fija
                    animate={{ rotate: tailAnimation.rotate }}
                    transition={{
                        repeat: Infinity,
                        duration: tailAnimation.duration,
                        ease: 'easeInOut',
                    }}>
                    <motion.path
                        className='text-slate-900'
                        d='M162.5,432.3c-53.5-15.9-64.6-146.6-64.9-199.6,0-.4,0-.7,0-1.1s0-.9,0-1.3c0-1.1,0-2.1,0-3.1h-.2c-.4-27-1.5-48.7-19.4-48.7s-25.9,17.5-27,42c0,.1-.5,14.4-.6,14.5-5.9,152.3,56.5,223.3,112.1,234.1l54.5-12.7'
                        fill='currentColor'
                    />
                </motion.g>

                {/* Nariz/boca */}
                <motion.path
                    className='text-slate-500'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M377.899 191.671C384.633 191.124 389.702 188.743 389.702 185.888C389.702 182.628 383.097 179.986 374.949 179.986C366.801 179.986 360.196 182.628 360.196 185.888C360.196 188.743 365.264 191.124 371.998 191.671V206.542H366.097C364.468 206.542 363.146 207.863 363.146 209.492C363.146 211.122 364.468 212.443 366.097 212.443H366.1H383.797H383.801C385.43 212.443 386.751 211.122 386.751 209.492C386.751 207.863 385.43 206.542 383.801 206.542H377.899V191.671Z'
                    fill='currentColor'
                />

                {/* Ojo izquierdo - círculo exterior */}
                <motion.circle className='text-yellow-100' cx='320.377' cy='152.253' r='39.833' fill='currentColor' />

                {/* Ojo derecho - círculo exterior */}
                <motion.circle className='text-yellow-100' cx='429.549' cy='152.253' r='39.833' fill='currentColor' />

                {/* Pupila izquierda */}
                <motion.circle
                    cx={leftPupil.x}
                    cy={leftPupil.y}
                    r='25'
                    fill='black'
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                    }}
                />

                {/* Pupila derecha */}
                <motion.circle
                    cx={rightPupil.x}
                    cy={rightPupil.y}
                    r='25'
                    fill='black'
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                    }}
                />
            </motion.svg>
        </div>
    )
}
