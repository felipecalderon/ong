import NextAuth from 'next-auth'
import CredentialsProvider from '@/app/api/auth/providers/credentials'
import { Google } from '@/app/api/auth/providers/social'
import { getUser, saveUser } from '@/actions/user.action'
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
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!account) return false
            if (account.provider === 'google') {
                const dbUser = await getUser(user.email!)
                if (dbUser) {
                    return true
                }
                const params = new URLSearchParams({
                    email: user.email ? user.email : '',
                    name: user.name ? user.name : '',
                    image: user.image ? user.image : '',
                })
                // Redirige a la ruta para completar el registro, pasando información relevante (como el email)
                return `/register?${params.toString()}`
            }
            return true
        },
        async redirect({ url, baseUrl }) {
            // Se asegura de que la redirección sea segura
            return url.startsWith(baseUrl) ? url : baseUrl
        },
    },
})

export { handler as GET, handler as POST }
