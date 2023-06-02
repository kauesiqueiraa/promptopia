'use client'

import { Profile } from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function MyProfile() {
  const { data: session } = useSession()

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${(session?.user as any)?.id}/posts`,
      )
      const data = await response.json()

      setPosts(data)
    }

    if ((session?.user as any)?.id) fetchPosts()
  }, [])

  const handleEdit = () => {}

  const handleDelete = async () => {}

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
