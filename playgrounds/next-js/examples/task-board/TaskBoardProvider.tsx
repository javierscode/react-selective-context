'use client'

import { SelectiveProvider } from 'react-selective-context'
import { TaskBoardContext } from './context'
import { initialTaskBoardState } from './TaskBoardState'

export function TaskBoardProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <SelectiveProvider context={TaskBoardContext} initialState={initialTaskBoardState}>
      {children}
    </SelectiveProvider>
  )
}
