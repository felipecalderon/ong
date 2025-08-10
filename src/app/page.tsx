import { HeroParallaxDemo } from '@/components/landing/hero'
import { HowToReport } from '@/components/landing/how-to-report'
import { Mission } from '@/components/landing/mission'
import { Values } from '@/components/landing/values'
import { Vision } from '@/components/landing/vision'
import { WhenToReport } from '@/components/landing/when-to-report'

export default async function Home() {
    return (
        <main className='flex flex-col items-center'>
            <HeroParallaxDemo />

            <section className='w-full py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16'>
                        <Mission />
                        <Vision />
                    </div>
                </div>
            </section>

            <Values />
            <WhenToReport />
            <HowToReport />
        </main>
    )
}
