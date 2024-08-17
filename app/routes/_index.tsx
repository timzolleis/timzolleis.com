import { ClientActionFunctionArgs, useFetcher, useLoaderData } from '@remix-run/react'
import { AnimatedText } from '~/components/animated-text'
import { texts } from '~/constants/texts'
import { z } from 'zod'
import { commands } from '~/constants/commands'
import { parseWithZod } from '@conform-to/zod'
import { Terminal } from '~/components/terminal'
import { useForm } from '@conform-to/react'
import {
  handleClearCommandAction,
  handleCommandHistoryAction,
  handleKnownCommandAction,
  handleUnknownCommandAction
} from '~/actions/command-actions'
import {
  addCommandToCommandHistory,
  getCommandHistory,
  getCommandResults,
  getCurrentHistoryIndex,
  setCurrentHistoryIndex
} from '~/models/command-history'
import { useEffect } from 'react'
import { redirectTo } from '~/utils/redirectTo'
import { isRedirectResult } from '~/utils/result-types'

export const commandSchema = z.object({
  command: z.nativeEnum(commands),
  intent: z.literal('command')
})

export const clearInputSchema = z.object({
  intent: z.literal('clearInput')
})

export const commandHistorySchema = z.object({
  intent: z.literal('history'),
  type: z.enum(['up', 'down'])
})

export type CommandHistorySchema = z.infer<typeof commandHistorySchema>

export const clientLoader = async () => {
  const [commandHistory, commandResults, currentHistoryIndex] = await Promise.all([
    getCommandHistory(),
    getCommandResults(),
    getCurrentHistoryIndex()
  ])
  return { commandHistory, commandResults, currentHistoryIndex }
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const submission = parseWithZod(await request.formData(), {
    schema: z.discriminatedUnion('intent', [commandSchema, clearInputSchema, commandHistorySchema])
  })
  if (submission.status !== 'success') {
    return handleUnknownCommandAction(submission)
  }
  switch (submission.value.intent) {
    case 'command': {
      const { command } = submission.value
      await addCommandToCommandHistory(command)
      await setCurrentHistoryIndex(null)
      // Handle clear command
      if (command === 'clear') {
        return await handleClearCommandAction(submission)
      }
      return handleKnownCommandAction(command, submission)
    }
    case 'history': {
      return handleCommandHistoryAction(submission, submission.value)
    }
    case 'clearInput': {
      await setCurrentHistoryIndex(null)
      return { result: submission.reply({ resetForm: true }) }
    }
  }
}

export default function Index() {
  const { commandHistory, commandResults, currentHistoryIndex } = useLoaderData<typeof clientLoader>()
  const fetcher = useFetcher<typeof clientAction>()
  const defaultCommand = currentHistoryIndex !== null ? commandHistory[currentHistoryIndex] : undefined

  const [form, fields] = useForm({
    lastResult: fetcher.state === 'idle' ? fetcher.data?.result : null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: commandSchema })
    }
  })

  useEffect(() => {
    if (fetcher.data && isRedirectResult(fetcher.data)) {
      redirectTo(fetcher.data.url)
    }
  }, [fetcher.data])

  return (
    <Terminal>
      <div>
        <div className='py-4 text-primary'>
          <AnimatedText text={texts.initial.title} />
        </div>
      </div>
      {commandHistory.map((command, index) => {
        const commandResult = commandResults?.[index]
        return (
          <div key={index}>
            <div className='flex items-center gap-2'>
              <CommandUser />
              <p>{command}</p>
            </div>
            <div>{commandResult?.lines.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}</div>
          </div>
        )
      })}
      <div className='flex items-center gap-2'>
        <CommandUser />
        <fetcher.Form method='post' id={form.id} key={form.key}>
          <input type='hidden' name={fields.intent.name} value={'command'} />
          <input
            defaultValue={defaultCommand}
            name={fields.command.name}
            onKeyDown={(event) => {
              switch (event.key) {
                case 'ArrowUp': {
                  event.preventDefault()
                  fetcher.submit({ intent: 'history', type: 'up' }, { method: 'post' })
                  break
                }
                case 'ArrowDown': {
                  event.preventDefault()
                  fetcher.submit({ intent: 'history', type: 'down' }, { method: 'post' })
                  break
                }
                case 'Escape': {
                  event.preventDefault()
                  fetcher.submit({ intent: 'clearInput' }, { method: 'post' })
                  break
                }
                case 'c': {
                  if (event.ctrlKey) {
                    event.preventDefault()
                    fetcher.submit({ intent: 'clearInput' }, { method: 'post' })
                    break
                  }
                }
              }
            }}
            spellCheck={false}
            autoFocus
            autoComplete='off'
            className='bg-transparent focus:border-none focus:outline-none w-full text-command caret-foreground'
          />
        </fetcher.Form>
      </div>
    </Terminal>
  )
}

export const CommandUser = () => {
  return (
    <div className='flex items-center'>
      <span className='text-primary'>guest</span>
      <span>@</span>
      <span className='text-secondary'>timzolleis.com</span>
      <span className='tracking-wider'>:$~</span>
    </div>
  )
}
