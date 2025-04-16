'use client'

import { useState, useEffect } from 'react'

interface MousePosition {
    x: number | null
    y: number | null
}
/**
 * useMousePosition hook
 *
 * Returns the current mouse position relative to the viewport.
 *
 * @returns mousePosition - The current mouse position relative to the viewport.
 * @example
 * mousePosition.x // The current mouse position on the x-axis
 * mousePosition.y // The current mouse position on the y-axis
 */
export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: null,
        y: null,
    })

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY })
        }

        // Throttle the mouse move event to optimize performance
        let ticking = false
        const handleMouseMove = (event: MouseEvent) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateMousePosition(event)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return mousePosition
}
