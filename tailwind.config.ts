import { type Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        extend: {
            zIndex: {
                dog: 0,
                body: 3,
                head: 4,
                tail: 2,
                legs: 2,
                cheast: 4,
                face: 6,
                mouth: 6,
                eyes: 6,
                years: 1,
                nose: 7,
            },
            animation: {
                'heart-beat': 'heart-beat 2s ease-out infinite',
                'dog-head': 'dog-head 1s ease-out infinite alternate',
                'dog-tail': 'dog-tail 170ms ease-out infinite',
                'dog-tail-before': 'dog-tail-before 160ms ease-out infinite',
                'dog-legs': 'dog-legs 1s ease-out infinite alternate 1.5s',
                'dog-eye': 'dog-eye 1800ms ease-out infinite',
                'left-year': 'left-year 1s ease-out infinite alternate',
                'right-year': 'right-year 1s ease-out infinite alternate',
            },
            keyframes: {
                'heart-beat': {
                    '0%': {
                        transform: 'scale(0.75) rotate(35deg)',
                        opacity: '1',
                    },
                    '5%, 15%, 25%': {
                        transform: 'scale(1) rotate(35deg)',
                    },
                    '10%, 20%': {
                        transform: 'scale(0.75) rotate(35deg)',
                    },
                    '70%': {
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'rotate(35deg) translateY(-10px) translateX(-10px)',
                        opacity: '0',
                    },
                },
                'dog-head': {
                    to: {
                        transform: 'translateX(-3px) rotate(3deg)',
                    },
                },
                'dog-tail': {
                    'from, to': {
                        transform: 'rotate(10deg)',
                    },
                    '50%, 60%': {
                        transform: 'rotate(70deg) translateX(10px) translateY(2px)',
                    },
                },
                'dog-tail-before': {
                    'from, to': {
                        transform: 'translateX(0)',
                    },
                    '50%': {
                        transform: 'translateX(3px)',
                    },
                },
                'dog-legs': {
                    from: {
                        transform: 'translateY(-1px)',
                    },
                    to: {
                        transform: 'translateY(0px)',
                    },
                },
                'dog-eye': {
                    'from, to': {
                        animationTimingFunction: 'step-end',
                        opacity: '1',
                    },
                    '50%, 55%': {
                        animationTimingFunction: 'step-start',
                        opacity: '0',
                    },
                },
                'left-year': {
                    from: {
                        transform: 'rotate(-26deg)',
                    },
                    '25%': {
                        transform: 'rotate(-35deg)',
                    },
                    '50%': {
                        transform: 'rotate(-26deg)',
                    },
                    to: {
                        transform: 'rotate(-40deg)',
                    },
                },
                'right-year': {
                    from: {
                        transform: 'rotate(-331deg)',
                    },
                    '25%': {
                        transform: 'rotate(-320deg)',
                    },
                    '50%': {
                        transform: 'rotate(-331deg)',
                    },
                    to: {
                        transform: 'rotate(-320deg)',
                    },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }: { addUtilities: any }) {
            const newUtilities = {
                '.animate-fill-both': {
                    'animation-fill-mode': 'both',
                },
            }
            addUtilities(newUtilities, ['responsive', 'hover'])
        },
    ],
}
