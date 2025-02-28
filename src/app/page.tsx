'use client'
import dynamic from 'next/dynamic'
// import MarkdownEditor from '@/components/md-editor/editor'
const MarkdownEditor = dynamic(() => import('@/components/md-editor/editor'), { ssr: false })
export default function Home() {
    return (
        <div className='grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <main className=''>
                <MarkdownEditor />
            </main>
        </div>
    )
}
