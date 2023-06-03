import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

interface Props {
  params: {
    promptId: string
  }
}

// GET (read)
export const GET = async (req: Request, { params: { promptId } }: Props) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(promptId).populate('creator')

    if (!prompt) return new Response('Prompt not found', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', {
      status: 500,
    })
  }
}

// PATCH (update)
export const PATCH = async (req: Request, { params: { promptId } }: Props) => {
  const { prompt, tag } = await req.json()

  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(promptId)

    if (!existingPrompt)
      return new Response('Prompt not found', { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 })
  }
}

// DELETE (delete)
export const DELETE = async (req: Request, { params: { promptId } }: Props) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(promptId)

    return new Response('Prompt deleted sucessfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete prompt', {
      status: 500,
    })
  }
}
