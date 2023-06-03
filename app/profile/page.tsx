'use client'

import { Profile } from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Prompt = {
  _id: string
  creator: {
    _id: string
    username: string
    email: string
    image: string
  }
  prompt: string
  tag: string
  __v: number
}

export default function MyProfile() {
  const { data: session } = useSession()
  const router = useRouter()
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

  const handleEdit = (post: Prompt) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post: Prompt) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        })

        const filteredPosts = posts.filter((p: Prompt) => p._id !== post._id)

        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

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
