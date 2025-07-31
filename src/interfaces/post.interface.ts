import { User } from './user.interface'

// Tipos para las propiedades del Post
export type PostType = 'denuncia' | 'noticia' | 'recomendacion'
export type ComplaintStatus = 'pendiente' | 'publicado' | 'resuelto' | 'rechazado'

// Interfaz para un Comentario
export interface Comment {
    _id: string
    user: User | string // Puede ser un objeto User populado o solo el ID
    content: string
    parentComment?: string // ID del comentario padre
    createdAt: string
    updatedAt: string
}

// Interfaz base para todos los Posts
interface BasePost {
    _id: string
    postType: PostType
    title: string
    content: string
    user: User | string // Puede ser un objeto User populado o solo el ID
    categories: string[]
    comments: Comment[]
    createdAt: string
    updatedAt: string
}

// Interfaz específica para Denuncias (complaint)
export interface ComplaintPost extends BasePost {
    postType: 'denuncia'
    status: ComplaintStatus
    location: string
    evidence: string[] // URLs a las pruebas
}

// Interfaz para Blog y Noticias
export interface GeneralPost extends BasePost {
    postType: 'noticia' | 'recomendacion'
    status?: never // Aseguramos que estos campos no existan
    location?: never
    evidence?: never
}

// Unión discriminada para el tipo Post principal
export type Post = ComplaintPost | GeneralPost

// Tipo para crear un nuevo post
export type newGeneralPost = Omit<GeneralPost, '_id' | 'createdAt' | 'updatedAt' | 'comments'>
export type newComplainPost = Omit<ComplaintPost, '_id' | 'createdAt' | 'updatedAt' | 'comments'>
export type NewPost = newGeneralPost | newComplainPost
