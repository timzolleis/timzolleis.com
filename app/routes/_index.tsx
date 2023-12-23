import type { MetaFunction } from '@remix-run/node'
import { CommandUser, Terminal, TerminalInput } from '~/components/terminal'
import { useCommandStore } from '~/utils/stores/command-store'
import { useTerminal } from '~/utils/hooks/use-terminal'
import { commands } from '~/constants/commands'
import { about, github, help, initial, rickRoll, socials, twitter, unknown } from '~/utils/command-handler'
import { redirectTo } from '~/utils/redirectTo'
import { texts } from '~/constants/texts'
import { Link } from '@remix-run/react'
import { AnimatedText } from '~/components/animated-text'
import { useEffect } from 'react'

export const meta: MetaFunction = () => {
  return [{ title: 'timzolleis.com' }, { name: 'description', content: 'Builing applications of the future.' }]
}

function useCommand() {
  const { writeText } = useTerminal()
  const store = useCommandStore()

  function handle(command: string) {
    store.resetSelected()
    switch (command) {
      case commands.ABOUT: {
        const lines = about()
        writeText(command, lines)
        break
      }
      case commands.HELP: {
        const lines = help()
        writeText(command, lines)
        break
      }
      case commands.CLEAR: {
        store.clear()
        break
      }
      case commands.GITHUB: {
        const lines = github()
        writeText(command, lines)
        setTimeout(function () {
          redirectTo(texts.socials.github.link)
        }, 1000)
        break
      }
      case commands.TWITTER: {
        const lines = twitter()
        writeText(command, lines)
        setTimeout(() => {
          redirectTo(texts.socials.twitter.link)
        }, 1000)
        break
      }
      case commands.RICKROLL: {
        const lines = rickRoll()
        writeText(command, lines)
        setTimeout(() => {
          redirectTo('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }, 1000)
        break
      }
      case commands.SOCIALS: {
        const lines = socials()
        writeText(command, lines)
        break
      }
      case commands.INITIAL: {
        const lines = initial()
        writeText(command, lines, false)
        break
      }
      default: {
        const lines = unknown()
        writeText(command, lines)
        break
      }
    }
  }

  return { handle }
}

export default function Index() {
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight)
  }
  const store = useCommandStore()
  useEffect(() => {
    scrollToBottom()
  }, [store.commands])

  const { handle } = useCommand()
  return (
    <Terminal>
      <div>
        <div className={'py-4 text-primary'}>
          <AnimatedText text={texts.initial.title} />
        </div>
        {store.commands.map((element, index) => (
          <div key={index} className={'max-w-3xl'}>
            <div className={'flex items-center gap-2'}>
              <CommandUser />
              <p className={'text-command'}>{element.command}</p>
            </div>
            <div className={'space-y-4 py-4'}>
              {element.lines.map((line, index) => (
                <div key={index} className={'grid grid-cols-3'}>
                  {line.title && <AnimatedText text={line.title} className={'col-span-2 text-primary'}></AnimatedText>}
                  {line.description && line.description?.startsWith('https://') ? (
                    <Link className={'col-start-3 underline'} to={line.description}>
                      <AnimatedText text={line.description} />
                    </Link>
                  ) : (
                    line.description && (
                      <span className={'col-start-3'}>
                        <AnimatedText text={line.description} />
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <TerminalInput
        defaultValue={store.getCurrentSelected()}
        onBack={() => store.decrementIndex()}
        onForward={() => store.incrementIndex()}
        onSubmit={(command) => handle(command)}
      />
    </Terminal>
  )
}
