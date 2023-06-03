'use client'

import { Profile } from '@components/Profile'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  params: {
    userId: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

const UserProfile = ({ params: { userId } }: Props) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`)
      const data = await response.json()
      setUserPosts(data)
    }

    if (userId) fetchUserPosts()
  }, [userId])

  return (
    <Profile
      name={userName as string}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exception prompts and be inspered by the power of their imagination.`}
      data={userPosts}
    />
  )
}

export default UserProfile
