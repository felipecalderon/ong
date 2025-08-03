import React from 'react'
import ReportButton from '../common/report-button'

const steps = [
    {
        title: 'Reúne Evidencia',
        description: 'Toma fotos, videos o consigue testigos del maltrato. Anota la fecha, hora y lugar de los hechos.',
    },
    {
        title: 'Contacta a las Autoridades',
        description: 'Llama a Carabineros (133) o a la PDI (134) para que tomen conocimiento del caso.',
    },
    {
        title: 'Presenta una Denuncia Formal',
        description: 'Acude a la fiscalía más cercana o a un juzgado de policía local para formalizar la denuncia.',
    },
    {
        title: 'Contacta a una ONG',
        description: 'Si necesitas asesoría legal, no dudes en contactarnos a través de nuestro formulario de denuncia.',
    },
]

export const HowToReport = () => {
    return (
        <section className='py-12 md:py-24'>
            <div className='container mx-auto px-4'>
                <h2 className='text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 via-amber-500 to-cyan-700 text-transparent bg-clip-text'>
                    ¿Cómo Denunciar?
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
                    {steps.map((step, index) => (
                        <div key={index} className='p-6 border border-gray-200 rounded-lg shadow-sm bg-white'>
                            <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                            <p className='text-gray-600'>{step.description}</p>
                        </div>
                    ))}
                </div>
                <div className='text-center'>
                    <ReportButton />
                </div>
            </div>
        </section>
    )
}
