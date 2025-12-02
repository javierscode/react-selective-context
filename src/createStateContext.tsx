import React, { createContext, useRef } from 'react'
import type { Store } from './types'
import { createStore } from './createStore'

type StateContextProviderProps<TState> = {
  children: React.ReactNode
  initialState: TState
}

export type StateContext<TState> = React.Context<Store<TState> | null> & {
  Provider: React.FC<StateContextProviderProps<TState>>
}

export function createStateContext<TState>(): StateContext<TState> {
  const StoreContext = createContext<Store<TState> | null>(null)

  function StateProvider({ children, initialState }: StateContextProviderProps<TState>) {
    const storeRef = useRef<Store<TState> | null>(null)
    if (!storeRef.current) {
      storeRef.current = createStore(initialState)
    }
    return (
      <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
    )
  }

  return Object.assign(StoreContext, { Provider: StateProvider })
}
