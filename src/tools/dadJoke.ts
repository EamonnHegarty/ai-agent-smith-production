import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'
import https from 'https'

export const dadJokeToolDefinition = {
  name: 'dad_joke',
  parameters: z.object({}),
  description: 'get a dad joke',
}

type Args = z.infer<typeof dadJokeToolDefinition.parameters>

export const dadJoke: ToolFn<Args, string> = async ({ toolArgs }) => {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  })

  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
    agent,
  })

  return (await res.json()).joke
}
