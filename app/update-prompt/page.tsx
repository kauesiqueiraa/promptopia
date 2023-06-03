'use client'

import Form from '@components/Form'

import { useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'

export default function EditPrompt() {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        })
      } catch (error) {}
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Prompt ID not found.')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'aplication/json' },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}
