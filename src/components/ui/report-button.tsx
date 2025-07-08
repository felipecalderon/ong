'use client'
import AuthButton from '../auth/button'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from '@/components/common/credenza'
import MarkdownEditor from '@/components/md-editor/editor'
import { useSession } from 'next-auth/react'

export default function ReportButton() {
    const { status } = useSession()
    return (
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
                    <ModalTitle className='pl-3'>Denunciar maltrato animal</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <p className='pl-3'>Haz tu denuncia relacionada con vulneraciones hacia los animales.</p>
                        {status === 'unauthenticated' ? (
                            <>
                                <p className='text-red-500'>Debes iniciar sesión para poder denunciar.</p>
                                <AuthButton />
                            </>
                        ) : (
                            <MarkdownEditor />
                        )}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
