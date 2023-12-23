// eslint-disable-next-line import/namespace
import { CommandLine, useCommandStore } from '~/utils/stores/command-store'
import { v4 as uuidv4 } from 'uuid'

export function useTerminal() {
  const store = useCommandStore()

  function writeText(command: string, lines: CommandLine[], history = true) {
    const id = uuidv4()
    store.addCommand(
      {
        id,
        command,
        lines
      },
      history
    )
  }

  return { writeText }
}
