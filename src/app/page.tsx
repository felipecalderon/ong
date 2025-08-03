import { HeroParallaxDemo } from '@/components/landing/hero'
import { HowToReport } from '@/components/landing/how-to-report'
import { Mission } from '@/components/landing/mission'
import { Values } from '@/components/landing/values'
import { Vision } from '@/components/landing/vision'
import { WhenToReport } from '@/components/landing/when-to-report'

export default async function Home() {
    return (
        <div className='grid items-center justify-items-center gap-16'>
            <HeroParallaxDemo />
            <div className='flex flex-col md:flex-row gap-8'>
                <Mission />
                <Vision />
            </div>
            <Values />
            <WhenToReport />
            <HowToReport />
        </div>
    )
}
