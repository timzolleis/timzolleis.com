import { ReactNode, useEffect, useRef, useState } from 'react'

export const Terminal = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'p-3 min-h-screen inset-0 text-sm'}>
      <main className={''}>
        <div className={'flex items-center gap-2'}>
          <div className={'w-3 h-3 rounded-full bg-red-500'} />
          <div className={'w-3 h-3 rounded-full bg-yellow-500'} />
          <div className={'w-3 h-3 rounded-full bg-green-500'} />
        </div>
        <div className={'p-4 h-full'}>{children}</div>
      </main>
    </div>
  )
}

type TerminalInputProps = {
  onSubmit: (command: string) => void
  disabled?: boolean
  defaultValue?: string
  onBack: () => void
  onForward: () => void
}

export const CommandUser = () => {
  return (
    <div className={'flex items-center'}>
      <span className={'text-primary'}>guest</span>
      <span>@</span>
      <span className={'text-secondary'}>timzolleis.com</span>
      <span className={'tracking-wider'}>:$~</span>
    </div>
  )
}

export const TerminalInput = ({ onSubmit, disabled, defaultValue, onBack, onForward }: TerminalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    window.addEventListener('mousedown', () => {
      inputRef.current?.focus()
    })
  }, [])

  useEffect(() => {
    setValue(defaultValue || '')
  }, [defaultValue])

  return (
    <div className={'flex items-center gap-2'}>
      <CommandUser />
      <input
        value={value}
        ref={inputRef}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSubmit(value)
            setValue('')
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            onForward()
          }
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            onBack()
          }
          if (event.key === 'Escape' || (event.ctrlKey && event.key === 'c')) {
            setValue('')
          }
        }}
        spellCheck={false}
        autoComplete={'off'}
        className={'bg-transparent focus:border-none focus:outline-none w-full text-command caret-foreground'}
      />
    </div>
  )
}
