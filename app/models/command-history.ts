import { getOrDefaultValue } from '~/models/utils'
import localforage from 'localforage'

export async function getCommandHistory() {
  return getOrDefaultValue<Array<string>>('commandHistory', [])
}

export async function setCommandHistory(commandHistory: Array<string>) {
  return localforage.setItem('commandHistory', commandHistory)
}

export async function addCommandToCommandHistory(command: string) {
  const commandHistory = await getCommandHistory()
  await setCommandHistory([...commandHistory, command])
}

export interface CommandResult {
  lines: string[]
}

export async function getCommandResults() {
  return getOrDefaultValue<Array<CommandResult>>('commandResults', [])
}

export async function setCommandResult(commandResults: Array<CommandResult>) {
  return localforage.setItem('commandResults', commandResults)
}

export async function addLinesToCommandResult(lines: Array<string>) {
  const currentResults = await getCommandResults()
  const newResults = [...currentResults, { lines }]
  await setCommandResult(newResults)
}

export async function getCurrentHistoryIndex() {
  return localforage.getItem<number>('currentHistoryIndex')
}

export async function setCurrentHistoryIndex(index: number | null) {
  return localforage.setItem('currentHistoryIndex', index)
}
