'use client'

import TiptapEditor from '@/components/editor-toolbar/editor' // El editor refactorizado
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePostStore } from '@/stores/post.store'

export default function CreatePostPage() {
    // El estado ahora se maneja aquí, en el componente padre.
    const { post, setPost, savePost, loading } = usePostStore()

    const handleContentChange = (newContent: string) => {
        setPost({ ...post, content: newContent })
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost({ ...post, title: event.target.value })
    }

    return (
        <main className='container mx-auto px-4 py-12'>
            <div className='max-w-3xl mx-auto flex flex-col gap-6'>
                <h1 className='text-3xl font-bold'>Crear Nueva Denuncia</h1>

                <div>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                        Motivo de la Denuncia
                    </label>
                    <Input
                        id='title'
                        type='text'
                        placeholder='Ej: Perro abandonado en Calle Falsa 123'
                        value={post.title}
                        onChange={handleTitleChange}
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Descripción Detallada</label>
                    <TiptapEditor
                        value={post.content}
                        onChange={handleContentChange}
                        placeholder='Describe la situación con la mayor cantidad de detalles posibles: estado del animal, ubicación exacta, etc.'
                    />
                </div>

                <div className='flex justify-end'>
                    <Button onClick={savePost} disabled={loading}>
                        {loading ? 'Enviando Denuncia...' : 'Enviar Denuncia'}
                    </Button>
                </div>
            </div>
        </main>
    )
}
