import { commands } from '~/constants/commands'
import { texts } from '~/constants/texts'

function makeRedirectCommand(url: string) {
  return { type: 'redirect', url, lines: [`Redirecting to ${url}...`] }
}

function makeTextCommand(lines: Array<string>) {
  return { type: 'print', lines }
}

function makeNotImplementedAction(command: string) {
  return { type: 'print', lines: ['The following command is not implemented yet:', command] }
}

const commandMap = {
  [commands.TWITTER]: makeRedirectCommand('https://twitter.com/timzolleis'),
  [commands.GITHUB]: makeRedirectCommand('https://github.com/timzolleis'),
  [commands.ABOUT]: makeTextCommand([texts.about.title]),
  [commands.HELP]: makeTextCommand(['Available commands:', ...(Object.values(commands) as string[])]),
  [commands.RICKROLL]: makeRedirectCommand('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
}
export function getActionForCommand(command: string) {
  return commandMap[command] ?? makeNotImplementedAction(command)
}
