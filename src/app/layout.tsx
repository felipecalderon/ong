import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/providers/auth'
import Navbar from '@/components/layout/navbar'
import { Toaster } from 'sonner'
import CatAnimated from '@/components/common/cat-animated'
import AuthButton from '@/components/auth/button'
import { navItems } from '@/lib/nav-links'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
