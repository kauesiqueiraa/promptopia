'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC, useState } from 'react'

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

type Props = {
  post: Prompt
  handleTagClick?: (tag: Prompt['tag']) => void
  handleEdit?: (post: Prompt) => void
  handleDelete?: (post: Prompt) => void
}

const PromptCard: FC<Props> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState('')
  const { data: session } = useSession()
  const pathName = usePathname()
  // const router = useRouter()

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(''), 3000)
  }
  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <Link
          href={
            post.creator._id === (session?.user as any)?.id
              ? '/profile'
              : `/profile/${post.creator._id}?name=${post.creator.username}`
          }
          className="flex flex-1 cursor-pointer items-center justify-start gap-3"
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt={copied === post.prompt ? 'tick_icon' : 'copy_icon'}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="blue_gradient cursor-pointer font-inter text-sm"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag.startsWith('#', 0) ? post.tag : `#${post.tag}`}
      </p>

      {(session?.user as any)?.id === post.creator._id &&
      pathName === '/profile' ? (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="orange_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default PromptCard
