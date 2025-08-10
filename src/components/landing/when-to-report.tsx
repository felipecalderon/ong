import React from 'react'

const situations = [
    'Abandono en la vía pública o en lugares deshabitados.',
    'Agresiones físicas, como golpes, patadas o heridas.',
    'Falta de alimentación o agua adecuada.',
    'Condiciones de vida insalubres o inadecuadas.',
    'Explotación para fines comerciales o de entretenimiento.',
    'Negligencia en la atención veterinaria.',
]

export const WhenToReport: () => React.JSX.Element = () => {
    return (
        <section className='w-full py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
                <h2 className='text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 via-amber-500 to-cyan-700 text-transparent bg-clip-text'>
                    ¿Cuándo hacer una denuncia?
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {situations.map((situation, index) => (
                        <div key={index} className='p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm'>
                            <p className='text-gray-700 dark:text-gray-300'>{situation}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
