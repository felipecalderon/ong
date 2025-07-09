import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Adopta una Mascota',
  description: 'Encuentra a tu nuevo mejor amigo. Estos maravillosos animales están buscando un hogar amoroso.',
}

import { animales } from '@/lib/animal-data'

export default function AdopcionesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Encuentra a tu Compañero Fiel
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Darle un hogar a un animal rescatado es un acto de amor que cambia dos vidas. Explora nuestros animales disponibles para adopción.
        </p>
      </section>

      <section className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {animales.map((animal) => (
            <div key={animal.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-56">
                <Image
                  src={animal.imagen}
                  alt={`Foto de ${animal.nombre}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{animal.nombre}</h3>
                <p className="text-gray-600 dark:text-gray-400">{animal.especie} - {animal.edad}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-2 mb-4 h-16">{animal.descripcion}</p>
                <Link href={`/adopciones/${animal.id}`} passHref>
                  <Button className="w-full">Conocer más</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
