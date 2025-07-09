import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Información y Recursos',
  description: 'Aprende sobre la tenencia responsable, cómo puedes ayudar y otros recursos importantes.',
}

const recursos = [
  {
    title: 'Cómo Ayudar',
    description: 'Descubre las diferentes maneras en las que puedes apoyar nuestra misión, desde el voluntariado hasta la difusión en redes sociales.',
    href: '/informacion/como-ayudar',
  },
  {
    title: 'Cuidados Responsables',
    description: 'Guías y consejos prácticos para asegurar el bienestar de tu mascota, cubriendo temas de salud, nutrición y comportamiento.',
    href: '/informacion/cuidados-responsables',
  },
  {
    title: 'Proceso de Adopción',
    description: 'Te explicamos paso a paso cómo funciona nuestro proceso de adopción para que estés preparado para recibir a tu nuevo amigo.',
    href: '/adopciones',
  },
  {
    title: 'Reportar un Caso',
    description: 'Si encuentras un animal en problemas, aquí te decimos cómo y cuándo debes reportarlo para que podamos actuar.',
    href: '/post', // Asumiendo que esta es la página para crear un reporte
  },
]

export default function InformacionPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Centro de Información
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          La educación es clave para construir una comunidad compasiva con los animales. Aquí encontrarás recursos valiosos para dueños de mascotas y para quienes desean ayudar.
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recursos.map((recurso) => (
            <Link href={recurso.href} key={recurso.title} passHref>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{recurso.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{recurso.description}</p>
                </div>
                <div className="flex items-center justify-end text-blue-600 dark:text-blue-400 font-semibold mt-4">
                  Leer más <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
