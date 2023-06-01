'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  session?: Session
}

const Provider: FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Provider
