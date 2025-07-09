'use client'
import { type Editor } from '@tiptap/react'
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo, Code } from 'lucide-react'

// Define un tipo para los props para mayor claridad
type ToolbarProps = {
    editor: Editor | null
}

// Componente reutilizable para los botones de la barra de herramientas
const ToolbarButton = ({ onClick, isActive, title, children }: {
    onClick: () => void
    isActive?: boolean
    title: string
    children: React.ReactNode
}) => (
    <button
        type="button" // Evita que los botones envíen un formulario por defecto
        onClick={onClick}
        className={`p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        title={title}
    >
        {children}
    </button>
)

export default function Toolbar({ editor }: ToolbarProps) {
    if (!editor) {
        return null
    }

    return (
        <div className='flex flex-wrap items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800'>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title='Negrita'>
                <Bold size={18} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title='Cursiva'>
                <Italic size={18} />
            </ToolbarButton>
            
            <div className='w-[1px] h-6 bg-gray-300 dark:bg-gray-600 mx-1'></div>

            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title='Encabezado 1'>
                <Heading1 size={18} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title='Encabezado 2'>
                <Heading2 size={18} />
            </ToolbarButton>

            <div className='w-[1px] h-6 bg-gray-300 dark:bg-gray-600 mx-1'></div>

            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title='Lista con viñetas'>
                <List size={18} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title='Lista numerada'>
                <ListOrdered size={18} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title='Cita'>
                <Quote size={18} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title='Bloque de código'>
                <Code size={18} />
            </ToolbarButton>

            <div className='w-[1px] h-6 bg-gray-300 dark:bg-gray-600 mx-1'></div>

            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title='Deshacer'>
                <Undo size={18} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title='Rehacer'>
                <Redo size={18} />
            </ToolbarButton>
        </div>
    )
}