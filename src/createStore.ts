import type { Listener, Store } from './types'

export function createStore<TState>(initialState: TState): Store<TState> {
  let state = initialState
  // SSR snapshot: frozen at initialization, never changes
  // This ensures hydration consistency between server and client
  const serverSnapshot = initialState
  const listeners = new Set<Listener>()

  return {
    getState: () => state,
    getServerSnapshot: () => serverSnapshot,
    setState: (next: TState) => {
      if (Object.is(next, state)) return
      state = next
      listeners.forEach((l) => l())
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
