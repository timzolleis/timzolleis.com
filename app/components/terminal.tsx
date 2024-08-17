import { ReactNode, RefObject, useEffect, useState } from 'react'
import { Form } from '@remix-run/react'

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
