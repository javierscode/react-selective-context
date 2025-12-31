import { createContext } from 'react'
import type { SelectiveContext, Store } from './types'

export function createSelectiveContext<TState>(): SelectiveContext<TState> {
  return createContext<Store<TState> | null>(null)
}

