'use client'
import { useState } from 'react'
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarLogo, NavBody, NavItems } from '../ui/resizable-navbar'

interface MenuNavbarProps {
    navItems: {
        name: string
        link: string
    }[]
    children: React.ReactNode
}

export default function MenuNavbar({ navItems, children }: MenuNavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <div className='flex items-center gap-4 z-50'>{children}</div>
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
                            className='relative text-neutral-600 dark:text-neutral-30a'>
                            <span className='block'>{item.name}</span>
                        </a>
                    ))}
                    <div className='flex w-full flex-col gap-4'>{children}</div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    )
}
