import NextAuth from 'next-auth'
import CredentialsProvider from '@/app/api/auth/providers/credentials'
import { Google } from '@/app/api/auth/providers/social'
const handler = NextAuth({
    providers: [CredentialsProvider, Google],
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
})

export { handler as GET, handler as POST }
