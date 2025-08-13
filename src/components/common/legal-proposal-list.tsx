import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Landmark, FileCheck, FlaskConical, type LucideIcon } from 'lucide-react'

type Proposal = {
    icon: LucideIcon
    title: string
    description: string
}

const proposalData: Proposal[] = [
    {
        icon: Landmark,
        title: 'Reconocimiento Constitucional sobre sintiencia',
        description:
            'Diversas propuestas buscan modificar la Carta Fundamental para otorgar a los animales un estatus jurídico que reconozca su sintiencia, cambiando su clasificación actual de "cosas" en el Código Civil.',
    },
    {
        icon: FileCheck,
        title: 'Fortalecimiento de la Ley de Tenencia Responsable',
        description:
            'Se discuten mejoras a la "Ley Cholito" para aumentar la efectividad en el control de poblaciones, la fiscalización del abandono y la educación a la comunidad, proponiendo sanciones más estrictas.',
    },
    {
        icon: FlaskConical,
        title: 'Restricciones a la Experimentación y Exhibición',
        description:
            'Existen propuestas para establecer reglas más estrictas sobre la experimentación en animales vivos y para regular las condiciones en espectáculos que los involucren, buscando proteger su integridad.',
    },
]

export function LegalProposalList() {
    return (
        <div className='container mx-auto px-4 py-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {proposalData.map((proposal, index) => (
                    <Card key={index} className='flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300'>
                        <CardHeader className='flex-grow-0'>
                            <div className='flex items-center gap-4'>
                                <CardTitle className='text-xl font-bold'>{proposal.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className='flex-grow'>
                            <p className='text-muted-foreground leading-relaxed'>{proposal.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <p className='text-center text-balance text-gray-500 text-lg italic pt-20 max-w-4xl mx-auto'>
                Te invitamos a mirar más allá de la forma y el instinto. En el ladrido emocionado de un reencuentro, en el ronroneo que busca calor o
                en la mirada que expresa temor, justo ahí yace la sintiencia. Es la simple y a la vez extraordinaria verdad de que los{' '}
                <strong>animales sienten</strong>. Su mundo interior es tan real y válido como el nuestro, lleno de emociones que van desde la alegría
                más pura hasta el sufrimiento más hondo. <br />
                ¿Qué significa para nosotros que ellos sientan? Significa que nuestras acciones tienen un eco en su existencia y que sus sentimientos
                merecen, como mínimo, nuestro más profundo respeto.
            </p>
        </div>
    )
}
