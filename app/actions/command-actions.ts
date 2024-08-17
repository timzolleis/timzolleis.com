import {
  addCommandToCommandHistory,
  addLinesToCommandResult,
  getCommandHistory,
  getCurrentHistoryIndex,
  setCommandHistory,
  setCommandResult,
  setCurrentHistoryIndex
} from '~/models/command-history'
import { Submission } from '@conform-to/dom'
import { Command } from '~/constants/commands'
import { getActionForCommand } from '~/utils/command-helper'
import { CommandHistorySchema } from '~/routes/_index'

export async function handleClearCommandAction<V, T extends Submission<V>>(submission: T) {
  await Promise.all([setCommandHistory([]), setCommandResult([])])
  return { type: 'print', result: submission.reply({ resetForm: true }) }
}

export async function handleUnknownCommandAction<V, T extends Submission<V>>(submission: T) {
  const command = submission.payload?.command as string | null
  if (command) {
    await addCommandToCommandHistory(command)
  }
  await addLinesToCommandResult(["Unknown command. Type 'help' for available commands"])
  return { type: 'print', result: submission.reply({ resetForm: true }) }
}

export async function handleKnownCommandAction<T>(command: Command, submission: Submission<T>) {
  const action = getActionForCommand(command)
  await addLinesToCommandResult(action.lines)
  return { ...action, result: submission.reply({ resetForm: true }) } as const
}

export async function handleCommandHistoryAction(submission: Submission<unknown>, data: CommandHistorySchema) {
  const { type } = data
  const commandHistory = await getCommandHistory()
  let currentHistoryIndex = (await getCurrentHistoryIndex()) ?? commandHistory.length
  if (type === 'up') {
    currentHistoryIndex -= 1
  }
  if (type === 'down') {
    currentHistoryIndex += 1
  }
  //Validate new index
  if (currentHistoryIndex >= 0) {
    await setCurrentHistoryIndex(currentHistoryIndex < commandHistory.length ? currentHistoryIndex : null)
  }
  return { type: 'null', result: submission.reply({ resetForm: false }) }
}
