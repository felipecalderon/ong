import NextAuth, { NextAuthOptions, User } from 'next-auth'
import { config } from './configAuth'

const handler = NextAuth(config)

export { handler as GET, handler as POST }
