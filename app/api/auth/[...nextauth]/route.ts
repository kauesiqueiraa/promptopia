import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import User from '@models/user'
import { connectToDB } from '@utils/database'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      await connectToDB()

      const sessionUser = await User.findOne({
        email: session!.user?.email,
      })
      if (sessionUser) {
        // eslint-disable-next-line prettier/prettier
      (session.user as any).id = sessionUser._id.toString()
      }

      return session
    },

    async signIn({ profile }) {
      await connectToDB()

      // check if a user already exists
      const userExists = await User.findOne({
        email: profile?.email,
      })

      // if not, create a new user
      if (!userExists) {
        try {
          await User.create({
            email: profile?.email,
            username: profile?.name,
            image: profile?.image,
          })
        } catch (error) {
          console.log(error)
        }
      }
      return true
    },
  },
})

export { handler as GET, handler as POST }
