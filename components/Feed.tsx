'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import PromptCard from './PromptCard'

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
      {data.length >= 1
        ? data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
        : null}
    </div>
  )
}

export default function Feed() {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState<Prompt[] | []>([])
  const [searchTimeout, setSearchTimeout] = useState<string | null | any>(null)
  const [searchedResults, setSearchedResults] = useState<Prompt[] | []>([])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    clearTimeout(searchTimeout)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500),
    )
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, 'i')
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt),
    )
  }

  const handleTagClick = (tagname: string) => {
    setSearchText(tagname)

    const searchResult = filterPrompts(tagname)
    setSearchedResults(searchResult)
  }
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

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}
