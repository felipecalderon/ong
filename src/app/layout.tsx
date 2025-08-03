import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poetsen_One } from 'next/font/google'
import AuthProvider from '@/providers/auth'
import Navbar from '@/components/layout/navbar'
import CatAnimated from '@/components/common/cat-animated'
import AuthButton from '@/components/auth/button'
import { navItems } from '@/lib/nav-links'
import { Toaster } from 'sonner'
import './globals.css'

const poetsen = Poetsen_One({
    variable: '--poetsen',
    weight: '400',
    subsets: ['latin'],
})

const geistSans = Geist({
    variable: '--geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Plataforma de Denuncia Animal y Medioambiental',
    description: 'Centralizando información para facilitar la acción de organizaciones y autoridades.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='es'>
            <body className={`${geistSans.variable} ${geistMono.variable} ${poetsen.variable} font-[family-name:var(--geist-sans)] antialiased`}>
                <AuthProvider>
                    <Toaster />
                    <Navbar navItems={navItems}>
                        <AuthButton />
                    </Navbar>
                    {children}
                    <CatAnimated />
                </AuthProvider>
            </body>
        </html>
    )
}
