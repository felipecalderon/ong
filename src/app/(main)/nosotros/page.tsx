import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce más sobre nuestra misión, visión y el equipo que hace todo posible.',
}

export default function NosotrosPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Nuestra Historia y Misión
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Somos una organización sin fines de lucro dedicada al rescate, rehabilitación y reubicación de animales en situación de vulnerabilidad. Conoce lo que nos impulsa.
        </p>
      </section>

      {/* Aquí irían los componentes <Mission />, <Vision />, <Values /> y <Team /> */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Misión</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Rescatar, proteger y encontrar hogares amorosos para animales abandonados o maltratados, promoviendo al mismo tiempo la tenencia responsable.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Visión</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Soñamos con un mundo donde cada animal sea tratado con respeto y compasión, y donde el abandono y el maltrato animal sean cosa del pasado.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Valores</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Compasión</li>
            <li>Compromiso</li>
            <li>Transparencia</li>
            <li>Colaboración</li>
          </ul>
        </div>
      </div>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Nuestro Equipo</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Un grupo de voluntarios apasionados que dedican su tiempo y esfuerzo a esta causa.
        </p>
        {/* Aquí se podría mapear y mostrar a los miembros del equipo */}
      </section>
    </main>
  )
}
