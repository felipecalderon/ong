'use client'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type TimelineItem = {
    year: string
    title: string
    description: string
}

const timelineData: TimelineItem[] = [
    {
        year: '1992',
        title: 'Ley N°19.162: Primeros Pasos',
        description:
            'Se establecen normativas para el ganado y el funcionamiento de mataderos. Aunque su enfoque principal era sanitario y económico, fue un paso hacia la regulación del trato animal.',
    },
    {
        year: '2009',
        title: 'Ley N°20.380: Protección Animal',
        description:
            'Marcó un hito al tipificar el maltrato como delito, establecer normas de respeto y abordar la educación sobre el bienestar animal.',
    },
    {
        year: '2017',
        title: 'Ley N°21.020: Tenencia Responsable',
        description:
            "Conocida como 'Ley Cholito', define las obligaciones de los dueños, crea un Registro Nacional de Mascotas y sanciona el abandono.",
    },
]

export function HistoricalTimeline() {
    return (
        <div className='container mx-auto px-4 py-12'>
            <div className='relative'>
                {/* Línea de tiempo (vertical en móvil, se centra en desktop) */}
                <div className='absolute top-0 h-[120%] w-0.5 bg-gradient-to-b from-gray-300 via-gray-300 dark:from-gray-600 to-transparent left-6 md:left-1/2 md:-translate-x-1/2'></div>

                {timelineData.map((item, index) => (
                    <div key={index} className='relative mb-12'>
                        {/* Círculo con el año */}
                        <div className='absolute top-1 w-12 h-12 bg-primary rounded-full flex items-center justify-center left-0 md:left-1/2 md:-translate-x-1/2'>
                            <span className='text-sm font-bold text-primary-foreground'>{item.year}</span>
                        </div>

                        {/* Contenido de la tarjeta */}
                        <div
                            className={cn(
                                'w-full pl-20 md:pl-0 md:w-[calc(50%-2rem)]',
                                index % 2 === 0
                                    ? 'md:ml-[calc(50%+2rem)]' // Elementos pares a la derecha en desktop
                                    : 'md:text-right md:mr-[calc(50%+2rem)]' // Elementos impares a la izquierda en desktop
                            )}>
                            <Card className={cn('shadow-lg hover:shadow-xl transition-shadow duration-300', index % 2 !== 0 && 'md:text-left')}>
                                <CardHeader>
                                    <CardTitle className='text-lg font-bold'>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-muted-foreground leading-relaxed'>{item.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
