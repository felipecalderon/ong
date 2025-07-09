import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con nosotros. Estamos aquí para responder tus preguntas.',
}

export default function ContactoPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Ponte en Contacto
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          ¿Tienes preguntas, sugerencias o quieres colaborar? No dudes en enviarnos un mensaje. Te responderemos lo antes posible.
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Formulario de Contacto */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Envíanos un Mensaje</h2>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nombre</Label>
                <Input id="name" type="text" placeholder="Tu nombre completo" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="tu@email.com" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Mensaje</Label>
                <Textarea id="message" placeholder="Escribe tu mensaje aquí..." className="mt-2" rows={5} />
              </div>
              <Button type="submit" className="w-full">Enviar Mensaje</Button>
            </form>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Nuestra Ubicación</h3>
              <p className="text-gray-700 dark:text-gray-300">Calle Falsa 123, Ciudad Gótica</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">(No abierto al público sin cita previa)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Correo Electrónico</h3>
              <p className="text-gray-700 dark:text-gray-300">contacto@onganimalista.org</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Horario de Atención</h3>
              <p className="text-gray-700 dark:text-gray-300">Lunes a Viernes: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
