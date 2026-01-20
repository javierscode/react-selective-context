import { useCallback, useContext } from 'react'
import type { Store } from './types'

export function useContextSetter<TState>(context: React.Context<Store<TState> | null>) {
  const store = useContext(context)
  if (!store) throw new Error('useContextSetter must be used inside a SelectiveProvider')

  const mutate = useCallback(
    (next: TState | ((prev: TState) => TState)) => {
      const currentState = store.getState()
      const nextState =
        typeof next === 'function'
          ? (next as (prev: TState) => TState)(currentState)
          : next

      store.setState(nextState)
    },
    [store]
  )

  return mutate
}
