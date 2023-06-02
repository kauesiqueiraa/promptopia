'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { PromptCard } from './PromptCard'

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

const PromptCardList = ({
  data = [],
  handleTagClick,
}: {
  data: Prompt[]
  handleTagClick: (tagName: string) => void
}) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default function Feed() {
  const [searchText, setSearchText] = useState('')
  const [post, setPost] = useState([])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPost(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  )
}
