import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import './tailwind.css'

export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com'
  },
  {
    href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
    rel: 'stylesheet'
  }
]

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className={'default font-mono min-h-screen scrollbar-hide'}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
