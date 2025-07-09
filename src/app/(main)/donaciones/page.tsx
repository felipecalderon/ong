import { Metadata } from 'next'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Donaciones',
  description: 'Tu apoyo es fundamental para continuar nuestra labor. Descubre cómo puedes contribuir.',
}

export default function DonacionesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Apoya Nuestra Causa
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Cada donación, sin importar el tamaño, nos ayuda a proporcionar alimento, refugio y atención médica a los animales que lo necesitan. Tu generosidad salva vidas.
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Formas de Donar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donación Monetaria */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Donación Única o Mensual</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Realiza una contribución monetaria segura a través de nuestra plataforma. Puedes elegir donar una vez o convertirte en un donante recurrente.
            </p>
            <Button className="w-full">Donar Ahora</Button>
          </div>

          {/* Donación en Especie */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Donación en Especie</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              También puedes ayudar donando alimentos, medicinas, mantas y otros suministros esenciales. Contáctanos para coordinar la entrega.
            </p>
            <Button variant="outline" className="w-full">Ver Puntos de Acopio</Button>
          </div>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">El Impacto de tu Donación</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          La transparencia es uno de nuestros valores fundamentales. Aquí puedes ver cómo utilizamos los fondos para maximizar nuestro impacto.
        </p>
        {/* Aquí podría ir un gráfico o un desglose del uso de los fondos */}
        <div className="text-left max-w-md mx-auto bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <p className="text-gray-800 dark:text-white"><span className="font-bold">70%</span> - Cuidado directo de animales (veterinario, alimentación).</p>
          <p className="text-gray-800 dark:text-white"><span className="font-bold">20%</span> - Mantenimiento de instalaciones y logística.</p>
          <p className="text-gray-800 dark:text-white"><span className="font-bold">10%</span> - Programas de concienciación y administración.</p>
        </div>
      </section>
    </main>
  )
}
