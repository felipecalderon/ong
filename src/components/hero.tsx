'use client'
import React from 'react'
import { HeroParallax } from './ui/hero-parallax'
import { Modal, ModalBody, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from '@/components/credenza'

export function HeroParallaxDemo() {
    return (
        <HeroParallax images={images}>
            <div className='absolute w-full left-0 top-40 z-50 flex flex-col items-center justify-center gap-6'>
                <h1 className='text-2xl md:text-7xl font-bold text-center'>
                    Protegemos vidas, <br /> Defendemos Derechos
                </h1>
                <p className='max-w-2xl text-base md:text-xl text-center'>
                    Buscamos promover, educar y defender los derechos de los animales en Chile mediante herramientas legales, formación ciudadana y
                    litigación estratégica, asegurando justicia y bienestar para todas las especies.
                </p>
                <Modal>
                    <ModalTrigger asChild>
                        <button className='bkn mx-auto'>
                            <span aria-hidden='true'>DENUNCIAR</span>
                            <span></span>
                            <span>DENUNCIAR</span>
                        </button>
                    </ModalTrigger>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Modal Title</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <p className='text-center'>This is a modal content.</p>
                                <p className='text-center'>This is a modal content.</p>
                                <p className='text-center'>This is a modal content.</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <ModalClose asChild>
                                <button className='btn btn-secondary'>Close</button>
                            </ModalClose>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </HeroParallax>
    )
}

export const images = [
    {
        title: 'Moonbeam',
        link: 'https://gomoonbeam.com',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/rbpulokotqsysldbkn9w',
    },
    {
        title: 'Cursor',
        link: 'https://cursor.so',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/hivt0fvyesu4lubo2etp',
    },
    {
        title: 'Rogue',
        link: 'https://userogue.com',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/lljckh8sf5ecxa1aj161',
    },

    {
        title: 'Editorially',
        link: 'https://editorially.org',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/kjv1luyogr0qkqtzyhpp',
    },
    {
        title: 'Editrix AI',
        link: 'https://editrix.ai',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/nhoedskgrrrqxqlqgx7m',
    },
    {
        title: 'Pixel Perfect',
        link: 'https://app.pixelperfect.quest',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/kwptocg0vfvzgam1wjwg',
    },

    {
        title: 'Algochurn',
        link: 'https://algochurn.com',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/h4ebabzbxixjfuoglgis',
    },
    {
        title: 'Algochurn2',
        link: 'https://algochurn.com',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/k3n2b8qbtieoactc9s08',
    },
    {
        title: 'Algochurn3',
        link: 'https://algochurn.com',
        thumbnail: 'https://res.cloudinary.com/duwncbe8p/image/upload/f_auto,q_auto/v1/ong/csytkjrsnruhldscdamf',
    },
]
