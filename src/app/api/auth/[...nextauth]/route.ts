import NextAuth, { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from '@/app/api/auth/providers/credentials'
import { Google } from '@/app/api/auth/providers/social'
import { getUser } from '@/actions/user.action'

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
        async signIn({ user, account }) {
            if (!account) return false

            if (account.provider === 'google') {
                const dbUser = await getUser(user.email!)
                if (dbUser) return true // Si el usuario de Google ya existe, permite el inicio de sesión

                // Si no, redirige a completar el registro
                const params = new URLSearchParams({
                    email: user.email || '',
                    name: user.name || '',
                    image: user.image || '',
                })
                return `/register?${params.toString()}`
            }

            return true // Para el proveedor de credenciales, la validación ya se hizo
        },

        async jwt({ token, user, trigger, session }) {
            // 1. Manejar la actualización manual de la sesión
            if (trigger === 'update' && session?.user) {
                token.name = session.user.name
                token.email = session.user.email
                token.picture = session.user.image // Actualiza la imagen
                return token
            }

            // 2. Al iniciar sesión, enriquecer el token con datos de la BD
            if (user) {
                const dbUser = await getUser(user.email!)
                if (dbUser) {
                    token.id = dbUser._id
                    token.picture = dbUser.image
                    token.name = dbUser.name
                }
            }

            return token
        },

        async session({ session, token }) {
            // 3. Pasar los datos enriquecidos del token a la sesión del cliente
            if (token) {
                session.user.id = token.id as string
                session.user.image = token.picture as string
                session.user.name = token.name as string
                session.user.email = token.email as string
            }
            return session
        },

        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
    },
})

export { handler as GET, handler as POST }
