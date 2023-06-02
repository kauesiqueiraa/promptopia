import React, { FC } from 'react'
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

interface Props {
  name: string
  desc: string
  data: Prompt[]
  handleEdit?: (post: Prompt) => void
  handleDelete?: (post: Prompt) => void
}

export const Profile: FC<Props> = ({
  name,
  desc,
  data = [],
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="prompt_layout mt-10">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}
