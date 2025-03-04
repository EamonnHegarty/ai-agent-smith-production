import { runLLM } from '../../src/llm'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'
import { redditToolDefinition } from '../../src/tools/reddit'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
import { runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: {
        name: toolName,
      },
    },
  ],
})

const allTools = [
  dadJokeToolDefinition,
  generateImageToolDefinition,
  redditToolDefinition,
]

runEval('allTools', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: 'tell me a funny dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: 'take a photo of mars',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'find me some bugs on the escape from tarkov reddit',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
