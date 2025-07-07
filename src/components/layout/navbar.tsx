'use client'
import AuthButton from '@/components/auth/button'
import { useState } from 'react'
import {
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    Navbar,
    NavbarButton,
    NavbarLogo,
    NavBody,
    NavItems,
} from '../ui/resizable-navbar'

export default function MenuNavbar() {
    const navItems = [
        {
            name: 'Features',
            link: '#features',
        },
        {
            name: 'Pricing',
            link: '#pricing',
        },
        {
            name: 'Contact',
            link: '#contact',
        },
    ]
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    return (
        // <nav className='w-full scroll flex justify-between items-center p-4 shadow-sm'>
        //     <h1 className='text-xl font-semibold'>Mi App</h1>
        // </nav>
        <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <div className='flex items-center gap-4 z-50'>
                    <AuthButton />
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </MobileNavHeader>

                <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                    {navItems.map((item, idx) => (
                        <a
                            key={`mobile-link-${idx}`}
                            href={item.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='relative text-neutral-600 dark:text-neutral-300'>
                            <span className='block'>{item.name}</span>
                        </a>
                    ))}
                    <div className='flex w-full flex-col gap-4'>
                        <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant='primary' className='w-full'>
                            Login
                        </NavbarButton>
                        <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant='primary' className='w-full'>
                            Book a call
                        </NavbarButton>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    )
}
