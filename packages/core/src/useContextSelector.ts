import { useContext, useSyncExternalStore, useRef, useCallback } from 'react'
import type { Selector, Store } from './types'
import { shallowEqual } from './shallowEqual'

export function useContextSelector<TState, TSlice>(
  context: React.Context<Store<TState> | null>,
  selector: Selector<TState, TSlice>,
  compare: (a: TSlice, b: TSlice) => boolean = shallowEqual
) {
  const store = useContext(context)
  if (!store) throw new Error('useContextSelector must be used inside a SelectiveProvider')

  // Validate selector is a function
  if (typeof selector !== 'function') {
    throw new Error('selector must be a function')
  }

  const lastSlice = useRef<TSlice>(selector(store.getState()))

  const getSnapshot = useCallback(() => {
    const next = selector(store.getState())
    if (!compare(lastSlice.current, next)) {
      lastSlice.current = next
    }
    return lastSlice.current
  }, [store, selector, compare])

  const getServerSnapshot = useCallback(() => {
    return selector(store.getServerSnapshot())
  }, [store, selector])

  return useSyncExternalStore(store.subscribe, getSnapshot, getServerSnapshot)
}

