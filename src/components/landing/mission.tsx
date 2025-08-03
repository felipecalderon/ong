import React from 'react'

export const Mission = () => {
    return (
        <div className='flex-1 p-8 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center'>
            <h2 className='text-4xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-cyan-700 text-transparent bg-clip-text'>
                Nuestra Misión
            </h2>
            <p className='text-lg text-center text-gray-700 max-w-md'>
                "Promover, educar y defender los derechos de los animales en Chile mediante herramientas legales, formación ciudadana y litigación
                estratégica, asegurando justicia y bienestar para todas las especies."
            </p>
        </div>
    )
}
