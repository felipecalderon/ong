import React from 'react'

export const Mission = () => {
    return (
        <div className='flex flex-col items-center text-center md:items-start md:text-left'>
            <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-cyan-700 text-transparent bg-clip-text'>
                Nuestra Misión
            </h2>
            <p className='text-lg text-gray-700 dark:text-gray-300'>
                Promover, educar y defender los derechos de los animales en Chile mediante herramientas legales, formación ciudadana y litigación
                estratégica, asegurando justicia y bienestar para todas las especies.
            </p>
        </div>
    )
}
