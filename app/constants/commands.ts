export const commands = {
  ABOUT: 'about',
  HELP: 'help',
  PROJECTS: 'projects',
  CLEAR: 'clear',
  GITHUB: 'github',
  TWITTER: 'twitter',
  RICKROLL: 'rm -rf'
}

export type Command = (typeof commands)[keyof typeof commands]
