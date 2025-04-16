import { HeroParallaxDemo } from '@/components/hero'
import MarkdownEditor from '@/components/md-editor/editor'

export default async function Home() {
    // await sleep(5000)
    return (
        <div className='grid items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]'>
            <HeroParallaxDemo />
            <MarkdownEditor />
        </div>
    )
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
