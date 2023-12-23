import { create } from 'zustand'

export type CommandLine = {
  title?: string
  description?: string
}

export type Command = {
  id: string
  command: string
  lines: CommandLine[]
}
type CommandStore = {
  commands: Command[]
  commandHistory: string[]
  currentSelectedIndex: number
  decrementIndex: () => void
  incrementIndex: () => void
  getCurrentSelected: () => string
  addCommand: (command: Command, history?: boolean) => void
  updateCommand: (command: Command) => void
  removeCommand: (id: Command['id']) => void
  resetSelected: () => void
  clear: () => void
}

export const useCommandStore = create<CommandStore>()((set, get) => ({
  commands: [],
  commandHistory: [],
  resetSelected: () => {
    set(() => ({
      currentSelectedIndex: 0
    }))
  },
  addCommand: (command, history = true) => {
    set((state) => ({
      commands: [...state.commands, command],
      commandHistory: history ? [...state.commandHistory, command.command] : state.commandHistory
    }))
  },
  removeCommand: (id) => {
    set((state) => ({
      commands: state.commands.filter((command) => command.id !== id)
    }))
  },
  updateCommand: (command) => {
    set((state) => ({
      commands: state.commands.map((item) => {
        if (item.id === command.id) {
          return {
            ...item,
            ...command
          }
        }
        return item
      })
    }))
  },
  currentSelectedIndex: 0,
  decrementIndex: () => {
    set((state) => ({
      currentSelectedIndex: state.currentSelectedIndex > 0 ? state.currentSelectedIndex - 1 : state.currentSelectedIndex
    }))
  },
  incrementIndex: () => {
    set((state) => ({
      currentSelectedIndex:
        state.currentSelectedIndex < state.commandHistory.length
          ? state.currentSelectedIndex + 1
          : state.currentSelectedIndex
    }))
  },
  getCurrentSelected: () => {
    return get().commandHistory?.[get().commandHistory.length - get().currentSelectedIndex] || ''
  },
  clear: () => {
    set({
      commands: []
    })
  }
}))
