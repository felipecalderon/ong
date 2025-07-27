import { Post } from './post.interface';

export interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    image?: string | null;
    posts?: Post[];
    createdAt: string;
    updatedAt: string;
}