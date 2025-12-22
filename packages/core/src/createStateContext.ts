import { createContext } from 'react'
import type { StateContext, Store } from './types'

export function createStateContext<TState>(): StateContext<TState> {
  return createContext<Store<TState> | null>(null)
}
