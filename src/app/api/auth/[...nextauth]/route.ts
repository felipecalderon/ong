import '@/models/user.model'
import '@/models/post.model'
import NextAuth from 'next-auth'
import { config } from './configAuth'

const handler = NextAuth(config)

export { handler as GET, handler as POST }
